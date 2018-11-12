{
    document.querySelector('.shift').addEventListener('click', () => {
        let noOfEmployees = 5;
        const shiftAPI = `http://localhost:4000/api/shifts?length=${noOfEmployees}`;

        fetch(shiftAPI)
        .then(resp => resp.json().then(json => console.log(json)))
        .catch(err => console.log(err));
        console.log('shift!');
    });

    document.querySelector('.leave').addEventListener('click', () => {
        console.log('leave!');
        let noOfEmployees = 5;
        let level = 3;
        const shifLeaveSchdAPI = `http://localhost:4000/api/leaveSchedules?levelNo=${level}&length=${noOfEmployees}`;

        fetch(shifLeaveSchdAPI)
        .then(resp => resp.json()).then(json => console.log(json))
        .catch(err => console.log(err));
    });
}