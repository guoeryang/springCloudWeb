export default [
    // menus/build
    {
      url: '/api/cgform/list',
      type: 'get',
      response: config => {
        return {
            "success": true,
            "message": "操作成功！",
            "code": 0,
            "timestamp": 1573427241154,
            "result": {
                "totalElements": 25,
                "records": [{
                   "id": "1",
                   "tableName": "后台数据录入测试",
                   "tableType": 1,
                   "tableTxt": "这个是",
                    "createBy": "jeecg",
                    "createTime": "2019-11-09 17:32:10",
                    "tableVersion": 2
                }, {
                   "id": "2",
                   "tableName": "测试2",
                   "tableType": 1,
                   "tableTxt": "描述",
                    "createBy": "jeecg",
                    "createTime": "2019-11-09 17:32:10",
                    "tableVersion": 2
                }]
            }
        }
      }
    }
  ]