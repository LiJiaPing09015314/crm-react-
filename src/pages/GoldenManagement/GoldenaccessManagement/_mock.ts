// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { parse } from 'url';
import { TableListItem, TableListParams } from './data.d';

// mock tableListDataSource
let tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push({
    key: i,
    id: i,
    zh_name: '曲丽丽',
    en_name: 'qulili',
    Interface: 'utf8_unicode_ci',
    exchange_rate: Math.floor(Math.random() * 1000),
    parameter: `TradeCode ${i}`,
    status: Math.floor(Math.random() * 10) % 2,
    author: `TradeCode ${i}`,
    creation_time: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    updated: `TradeCode ${i}`,
    update_time: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
  });
}

function getRule(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const params = (parse(url, true).query as unknown) as TableListParams;

  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource: TableListItem[] = [];
    status.forEach((s: string) => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter((item) => {
          if (parseInt(`${item.status}`, 10) === parseInt(s.split('')[0], 10)) {
            return true;
          }
          return false;
        }),
      );
    });
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter((data) => data.name.includes(params.name || ''));
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = parseInt(`${params.pageSize}`, 0);
  }

  const result = {
    data: dataSource,
    total: dataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };

  return res.json(result);
}

function postRule(req: Request, res: Response, u: string, b: Request) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, id, zh_name, en_name, Interface, exchange_rate, parameter, status, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.key) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        ...body,
        key: i,
        status: Math.floor(Math.random() * 10) % 2,
        author: `TradeCode ${i}`,
        creation_time: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
        updated: `TradeCode ${i}`,
        update_time: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map((item) => {
        if (item.key === key) {
          return { ...item, id, zh_name, en_name, Interface, exchange_rate, parameter, status };
        }
        return item;
      });
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  return res.json(result);
}

export default {
  'GET /api/GoldenAccess': getRule,
  'POST /api/GoldenAccess': postRule,
};
