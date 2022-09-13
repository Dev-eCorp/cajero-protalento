let accounts = [
    {
        accountNumber: "0001",
        firstName: "Eduard",
        lastName: "Cruz",
        password: "1234",
        balance: 100,
        history: []
    },
    {
        accountNumber: "0002",
        firstName: "Laura",
        lastName: "Perez",
        password: "0987",
        balance: 200,
        history: []
    },
    {
        accountNumber: "0003",
        firstName: "Camila",
        lastName: "Paez",
        password: "5678",
        balance: 300,
        history: []
    },
];


//index page
let actualURL = window.location;
if (actualURL.pathname === "/pages/index.html") {
    let valueAccountNumber = "";
    let inputAccountNumber = document.querySelector("#accountNumber");
    let btnFirstButton = document.querySelector("#firstButton");
    btnFirstButton.addEventListener("click", () => {
        valueAccountNumber = inputAccountNumber.value;
        sessionStorage.setItem("valueAccountNumber", valueAccountNumber)
        location.href = "/pages/password.html";
    });
}

//password page
if (actualURL.pathname === "/pages/password.html") {
    let valueAccountNumber = sessionStorage.getItem("valueAccountNumber");
    let clearBtn = document.querySelector("#clear"),
        deleteBtn = document.querySelector("#delete"),
        passInput = document.querySelector("#pass"),
        backBtn = document.querySelector(".back"),
        submitBtn = document.querySelector("#submitButton");

    backBtn.addEventListener("click", () => {
        location.href = "/pages/index.html";
    });

    clearBtn.addEventListener("click", () => {
        passInput.value = "";
    });

    deleteBtn.addEventListener("click", () => {
        passInput.value = passInput.value.substring(0, passInput.value.length - 1);
    });

    function getData(ref){
        let value = ref.getAttribute("value");
        passInput.value += value;
    }

    submitBtn.addEventListener("click", () => {
        for (let i = 0; i < accounts.length; i++) {
            if (valueAccountNumber === accounts[i].accountNumber && passInput.value === accounts[i].password) {
                let loggedAccount = [];
                loggedAccount.push(accounts[i]);
                sessionStorage.setItem("loggedAccount", JSON.stringify(loggedAccount));
                location.href = "/pages/menu.html";
            }
        }
        setTimeout(() => {alert("You have entered the wrong user name or password");}, 100);
    });
}

//menu
if (actualURL.pathname === "/pages/menu.html") {
    let loggedAccount = JSON.parse(sessionStorage.getItem("loggedAccount"));
    let depositBtn = document.querySelector(".deposit"),
        historyBtn = document.querySelector(".history"),
        withdrawInput = document.querySelector(".withdraw"),
        backBtn = document.querySelector(".back"),
        userInfoH2 = document.querySelector("#userInfo");

    userInfoH2.innerHTML = `User: ${loggedAccount[0].firstName} ${loggedAccount[0].lastName}`;

    backBtn.addEventListener("click", () => {
        location.href = "/pages/index.html";
    });

    depositBtn.addEventListener("click", () => {
        location.href = "/pages/deposit.html";
    });

    historyBtn.addEventListener("click", () => {
        location.href = "/pages/history.html";
    });

    withdrawInput.addEventListener("click", () => {
        location.href = "/pages/withdraw.html";
    });
}

//deposit
if (actualURL.pathname === "/pages/deposit.html") {
    let loggedAccount = JSON.parse(sessionStorage.getItem("loggedAccount"));
    let backBtn = document.querySelector(".back"),
        depositNum = document.querySelector("#depositAmount"),
        depositBtn = document.querySelector("#depositButton");

    backBtn.addEventListener("click", () => {
        location.href = "/pages/menu.html";
    });

    var accountTransactions = loggedAccount[0].history;
    depositBtn.addEventListener("click", () => {
        accountTransactions.push({type: "Deposit", amount: parseInt(depositNum.value)});
        sessionStorage.setItem("accountTransactions", JSON.stringify(accountTransactions));
    });
}

//history
if (actualURL.pathname === "/pages/history.html") {
    let accountTransactions = JSON.parse(sessionStorage.getItem("accountTransactions"));
    let loggedAccount = JSON.parse(sessionStorage.getItem("loggedAccount"));
    let backBtn = document.querySelector(".back"),
        userInfoH2 = document.querySelector("#userInfo");

    userInfoH2.innerHTML = `User: ${loggedAccount[0].firstName} ${loggedAccount[0].lastName}`;

    backBtn.addEventListener("click", () => {
        location.href = "/pages/menu.html";
    });

    for (let i = 0; i < accountTransactions.length; i++) {
        let listTransactions = document.createElement("li");
        listTransactions.innerHTML = `${accountTransactions[i].type} $${accountTransactions[i].amount}`;
        document.getElementById("historyList").appendChild(listTransactions);
    }
}

//withdraw
if (actualURL.pathname === "/pages/withdraw.html") {
    let accountTransactions = JSON.parse(sessionStorage.getItem("accountTransactions"));
    let backBtn = document.querySelector(".back"),
        withdrawNum = document.querySelector("#withdrawAmount"),
        withdrawBtn = document.querySelector("#withdrawButton");

    backBtn.addEventListener("click", () => {
        location.href = "/pages/menu.html";
    });

    withdrawBtn.addEventListener("click", () => {
        accountTransactions.push({type: "Withdraw", amount: parseInt(withdrawNum.value)});
        sessionStorage.setItem("accountTransactions", JSON.stringify(accountTransactions));
        console.log(accountTransactions)
    });
}