// Your code here



const createEmployeeRecord = (arr) => {
    const testEmployee = {};

    testEmployee.firstName = arr[0];
    testEmployee.familyName = arr[1];
    testEmployee.title = arr[2];
    testEmployee.payPerHour = arr[3];
    testEmployee.timeInEvents = [];
    testEmployee.timeOutEvents = [];

    return testEmployee;
}


const createEmployeeRecords = (arr) => {
    let employeeRecords = [];

    employeeRecords = arr.map((element) => {
        return createEmployeeRecord(element);
    })

    return employeeRecords;
}

const createTimeInEvent = (obj, time) => {
    
    const dateTime = time.split(" ");
    obj.timeInEvents.push({
        date: dateTime[0],
        type: "TimeIn",
        hour: parseInt(dateTime[1], 10)
    })

    return obj;
}

let a = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3]);
let b = createTimeInEvent(a, "2014-02-28 1400")

const createTimeOutEvent = (obj, time) => {
    const dateTime = time.split(" ");
    obj.timeOutEvents.push({
        date: dateTime[0],
        type: "TimeOut",
        hour: parseInt(dateTime[1], 10)
    })
    return obj;
}

const check24 = (hrs) => {
    if(parseInt(hrs) > 24){
        return hrs.slice(0,1);
    }else{
        return hrs;
    }
}

const hoursWorkedOnDate = (obj, date) => {
    let result = 0;
    obj.timeInEvents.forEach((timeInEvent) => {
        if(date === timeInEvent.date){
            obj.timeOutEvents.forEach((timeOutEvent) => {
                if(date === timeOutEvent.date){
                    result =  check24(timeOutEvent.hour.toString().slice(0,2)) - check24(timeInEvent.hour.toString().slice(0,2));
                }
            })
        }
    })
    return result;
}

const wagesEarnedOnDate = (obj, date) => {
    const hrs = hoursWorkedOnDate(obj, date);
    return hrs * obj.payPerHour;
}

const allWagesFor = (obj) => {
    const dates = [];

    obj.timeInEvents.map((timeEvent) => {
        dates.push(timeEvent.date)
    })

    const wages = dates.map((date) => {
        return wagesEarnedOnDate(obj, date);
    })

    return wages.reduce((prev, curr) => {
        return prev + curr;
    });
}

const calculatePayroll = (arr) => {
    const wages = arr.map((element) => {
        return allWagesFor(element);
    })
    
    return wages.reduce((prev, curr) => {
        return prev + curr;
    })
}