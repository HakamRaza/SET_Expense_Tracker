const apiData =[{

// http://localhost:8000/api/auth/login

    Login : 
    {
        "status": "success",
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU5NzczNDEzMywiZXhwIjoxNTk3NzM3NzMzLCJuYmYiOjE1OTc3MzQxMzMsImp0aSI6IlRuVkZZUnMyM2dXSlJycEciLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.aid3klZrFtHqrhEuH5Nsx2h_awEgHSZ0oEtSirHnckA",
        "results": {
        "user": {
            "id": 1,
            "email": "test@test.com",
            "email_verified_at": null,
            "created_at": "2020-08-18T06:57:10.000000Z",
            "updated_at": "2020-08-18T06:57:10.000000Z"
        }
        }
    },

    Register :
    {
        "status": "success",
        "message": "User successfully registered",
        "user": {
        "email": "test2@test.com",
        "updated_at": "2020-08-18T07:00:44.000000Z",
        "created_at": "2020-08-18T07:00:44.000000Z",
        "id": 2
        },
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9hdXRoXC9yZWdpc3RlciIsImlhdCI6MTU5NzczNDA0NCwiZXhwIjoxNTk3NzM3NjQ0LCJuYmYiOjE1OTc3MzQwNDQsImp0aSI6ImFUWFhNNHJKUzZqMDFKV0giLCJzdWIiOjIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.OxjEOxJsfp5miQ_2meLB7aDZIfG14YKRwY4KFIFfh8w"
    },
    

    GetAllTrans :
    {
        "status": "success",
        /////////////////////////////////////////////////////
        "data": [
        {
            "id": 1,
            "user_id": 2,
            "category_id": 1,
            "transaction_title": "Burger",
            "amount": "-10.00",
            "date": "2020-08-18",
            "created_at": "2020-08-18T07:07:02.000000Z",
            "updated_at": "2020-08-18T07:07:02.000000Z",
            "category_title": "Food"
        },
        {
            "id": 2,
            "user_id": 2,
            "category_id": 1,
            "transaction_title": "Sell Cookie",
            "amount": "40.00",
            "date": "2020-08-18",
            "created_at": "2020-08-18T07:08:19.000000Z",
            "updated_at": "2020-08-18T07:08:19.000000Z",
            "category_title": "Food"
        },
        {
            "id": 3,
            "user_id": 2,
            "category_id": 1,
            "transaction_title": "Buy Cookie",
            "amount": "-40.00",
            "date": "2020-08-18",
            "created_at": "2020-08-18T07:13:19.000000Z",
            "updated_at": "2020-08-18T07:13:19.000000Z",
            "category_title": "Food"
        }
        ],

        ////////////////////////////////////////////////////////////////////
        "user_cats": [
        {
            "id": 1,
            "user_id": 2,
            "category_title": "Food",
            "budget": {
            "8/2020": 1000
            },
            "created_at": "2020-08-18T07:00:44.000000Z",
            "updated_at": "2020-08-18T07:00:44.000000Z"
        },
        {
            "id": 2,
            "user_id": 2,
            "category_title": "Others",
            "budget": {
            "8/2020": 1000
            },
            "created_at": "2020-08-18T07:00:44.000000Z",
            "updated_at": "2020-08-18T07:00:44.000000Z"
        },
        {
            "id": 3,
            "user_id": 2,
            "category_title": "Clothes",
            "budget": {
            "8/2020": "750.00"
            },
            "created_at": "2020-08-18T07:14:39.000000Z",
            "updated_at": "2020-08-18T07:14:39.000000Z"
        }
        ]
    },


    UpdatedTrans : 
    {
        "status": "success",
        "message": "Transaction details updated successfully",
        "transaction": {
        "id": 1,
        "user_id": 2,
        "category_id": 1,
        "transaction_title": "Burger",
        "amount": "-7.40",
        "date": "2020-08-16",
        "created_at": "2020-08-18T07:07:02.000000Z",
        "updated_at": "2020-08-18T07:19:06.000000Z"
        }
    },


    DeleteTrans :
    {
        "status": "success",
        "message": "Transaction deleted successfully",
        "transaction": {
        "id": 2,
        "user_id": 2,
        "category_id": 1,
        "transaction_title": "Sell Cookie",
        "amount": "40.00",
        "date": "2020-08-18",
        "created_at": "2020-08-18T07:08:19.000000Z",
        "updated_at": "2020-08-18T07:08:19.000000Z"
        }
    },

    AddCategory :
    {
        "status": "success",
        "message": "Category added successfully",
        "category": {
        "user_id": 2,
        "category_title": "Clothes",
        "budget": {
            "8/2020": "750.00"
        },
        "updated_at": "2020-08-18T07:14:39.000000Z",
        "created_at": "2020-08-18T07:14:39.000000Z",
        "id": 3
        }
    },

    UpdateCategory :
    {
        "status": "success",
        "message": "Category details updated successfully",
        "category": {
        "id": 1,
        "user_id": 2,
        "category_title": "Food",
        "budget": {
            "8/2020": "500.00"
        },
        "created_at": "2020-08-18T07:00:44.000000Z",
        "updated_at": "2020-08-18T07:23:50.000000Z"
        }
    },


    DeleteCategory :
    {
        "status": "success",
        "message": "Category deleted successfully",
        "category": {
        "id": 3,
        "user_id": 1,
        "category_title": "Clothes",
        "budget": {
            "8/2020": "750.00"
        },
        "created_at": "2020-08-18T04:57:47.000000Z",
        "updated_at": "2020-08-18T04:57:47.000000Z"
        }
    },

    GetCategoryBar :
    {
        "status": "success",
        "barsData": [
        {
            "title": "Food",
            "totalExpense": 16.7,
            "budget": 100,
            "color": "blue"
        },
        {
            "title": "Others",
            "totalExpense": 7.3,
            "budget": 100,
            "color": "green"
        }
        ]
    },


    GetPie :
    {
        "status": "success",
        "pieData": [
        {
            "x": 1,
            "y": 16.7,
            "label": "Food"
        },
        {
            "x": 2,
            "y": 7.3,
            "label": "Others"
        }
        ]
    },

    GetOverview : 


    {
        "status": "success",

        //////////////////////////////////////////////////////////
        "budgetData": [
        {
            "x": "01/08",
            "y": 200
        },
        {
            "x": "02/08",
            "y": 200
        },
        {
            "x": "03/08",
            "y": 200
        },
        {
            "x": "04/08",
            "y": 200
        },
        {
            "x": "05/08",
            "y": 200
        },
        {
            "x": "06/08",
            "y": 200
        },
        {
            "x": "07/08",
            "y": 200
        },
        {
            "x": "08/08",
            "y": 200
        },
        {
            "x": "09/08",
            "y": 200
        },
        {
            "x": "10/08",
            "y": 200
        },
        {
            "x": "11/08",
            "y": 200
        },
        {
            "x": "12/08",
            "y": 200
        },
        {
            "x": "13/08",
            "y": 200
        },
        {
            "x": "14/08",
            "y": 200
        },
        {
            "x": "15/08",
            "y": 200
        },
        {
            "x": "16/08",
            "y": 200
        },
        {
            "x": "17/08",
            "y": 200
        },
        {
            "x": "18/08",
            "y": 200
        },
        {
            "x": "19/08",
            "y": 200
        },
        {
            "x": "20/08",
            "y": 200
        },
        {
            "x": "21/08",
            "y": 200
        }
        ],

        ///////////////////////////////////////////////////////////
        "dailyExpenseData": [
        {
            "x": "01/08",
            "y": 0
        },
        {
            "x": "02/08",
            "y": 0
        },
        {
            "x": "03/08",
            "y": 0
        },
        {
            "x": "04/08",
            "y": 0
        },
        {
            "x": "05/08",
            "y": 0
        },
        {
            "x": "06/08",
            "y": 0
        },
        {
            "x": "07/08",
            "y": 0
        },
        {
            "x": "08/08",
            "y": 0
        },
        {
            "x": "09/08",
            "y": 0
        },
        {
            "x": "10/08",
            "y": 0
        },
        {
            "x": "11/08",
            "y": 0
        },
        {
            "x": "12/08",
            "y": 0
        },
        {
            "x": "13/08",
            "y": 0
        },
        {
            "x": "14/08",
            "y": 0
        },
        {
            "x": "15/08",
            "y": 0
        },
        {
            "x": "16/08",
            "y": 0
        },
        {
            "x": "17/08",
            "y": 16.7
        },
        {
            "x": "18/08",
            "y": 0
        },
        {
            "x": "19/08",
            "y": 7.3
        },
        {
            "x": "20/08",
            "y": 0
        },
        {
            "x": "21/08",
            "y": 0
        }
        ],

        //////////////////////////////////////////////////////////
        "totalExpenseData": [
        {
            "x": "01/08",
            "y": 0
        },
        {
            "x": "02/08",
            "y": 0
        },
        {
            "x": "03/08",
            "y": 0
        },
        {
            "x": "04/08",
            "y": 0
        },
        {
            "x": "05/08",
            "y": 0
        },
        {
            "x": "06/08",
            "y": 0
        },
        {
            "x": "07/08",
            "y": 0
        },
        {
            "x": "08/08",
            "y": 0
        },
        {
            "x": "09/08",
            "y": 0
        },
        {
            "x": "10/08",
            "y": 0
        },
        {
            "x": "11/08",
            "y": 0
        },
        {
            "x": "12/08",
            "y": 0
        },
        {
            "x": "13/08",
            "y": 0
        },
        {
            "x": "14/08",
            "y": 0
        },
        {
            "x": "15/08",
            "y": 0
        },
        {
            "x": "16/08",
            "y": 0
        },
        {
            "x": "17/08",
            "y": 16.7
        },
        {
            "x": "18/08",
            "y": 16.7
        },
        {
            "x": "19/08",
            "y": 24
        },
        {
            "x": "20/08",
            "y": 24
        },
        {
            "x": "21/08",
            "y": 24
        }
        ]
    },

}];

export default apiData;