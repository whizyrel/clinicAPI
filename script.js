{
    document.querySelector('.shift').addEventListener('click', () => {
        console.log('shift!');
        let noOfEmployees = 5;
        const shiftAPI = `http://localhost:4000/api/shifts/length=${noOfEmployees}`;

        fetch(shiftAPI)
        .then(resp => console.log(resp))
        .catch(err => console.log(err));
    });

    document.querySelector('.leave').addEventListener('click', () => {
        console.log('leave!');
        let noOfEmployees = 5;
        let level = 3;
        const shiftAPI = `http://localhost:4000/api/leaveSchedules/level=${level}&&length=${noOfEmployees}`;

        fetch(shiftAPI)
        .then(resp => console.log(resp))
        .catch(err => console.log(err));
    });
}