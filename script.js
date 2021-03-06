const Modal = {
    toggle() {
        let modal = document.querySelector(".modal-overlay").className.search("active");
        if (modal == -1) {
            document
                .querySelector('.modal-overlay')
                .classList
                .add("active");
        } else {
            document
                .querySelector(".modal-overlay")
                .classList
                .remove("active");
        }
    }
};

const Transaction = {
    all: transactions = [
        {
            description: 'Luz',
            amount: -50000,
            date: '23/01/2021'
        },
        {
            description: 'Criação website',
            amount: 500000,
            date: '23/01/2021'
        },
        {
            description: 'Internet',
            amount: -20000,
            date: '23/01/2021'
        }
    ],
    add(transaction) {
        Transaction.all.push(transaction)

        App.reload();
    },
    remove(index) {
        Transaction.all.splice(index, 1);

        App.reload();
    },
    incomes() {
        let income = 0;

        Transaction.all.forEach((transaction) => {
            if(transaction.amount > 0) {
                income += transaction.amount;
            }
        });

        return income;
    },
    expenses() {
        let expanse = 0;

        Transaction.all.forEach((transaction) => {
            if(transaction.amount < 0) {
                expanse += transaction.amount;
            }
        });

        return expanse;
    },
    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
};

const DOM = {
    transactionContainer: document.querySelector("#data-table tbody"),
    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);
        DOM.transactionContainer.appendChild(tr);
    },
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense";

        const amount = Utils.formatCurrency(transaction.amount);

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover transação">
            </td>
        `;

        return html;
    },
    updateBalance() {
        document
            .getElementById("incomeDisplay")
            .innerHTML = Utils.formatCurrency(Transaction.incomes());
        document
            .getElementById("expanseDisplay")
            .innerHTML = Utils.formatCurrency(Transaction.expenses());
        document
            .getElementById("totalDisplay")
            .innerHTML = Utils.formatCurrency(Transaction.total());
    },
    clearTransactions() {
        DOM.transactionContainer.innerHTML = "";
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "";
        value = String(value).replace(/\D/g,"")
        value = Number(value) / 100;
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value;
    },
    formatAmount(value) {
        value = Number(value) * 100;
        return value;
    },
    formatDate(date) {
        const splittedDate = date.split("-");
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
    }
}

const Form = {
    description: document.querySelector("input#description"),
    amount: document.querySelector("input#amount"),
    date: document.querySelector("input#date"),
    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },
    validateFields(){
        const { description, amount, date } = Form.getValues();

        if(description.trim() === "" || amount.trim() === "" || date.trim() === "") {
            throw new Error("Preencha todos os dados corretamente.")
        }
    },
    formatData() {
        let { description, amount, date } = Form.getValues();

        amount = Utils.formatAmount(amount);
        date = Utils.formatDate(date);

        return {
            description,
            amount,
            date
        }
    },
    save(transaction) {
        Transaction.add(transaction);
    },
    clearFields() {
        Form.description.value = "";
        Form.amount.value = "";
        Form.date.value = "";
    },
    submit(event) {
        event.preventDefault();

        try {
            Form.validateFields();
            const transaction = Form.formatData();
            Form.save(transaction);
            Form.clearFields();
            Modal.toggle();
        } catch (e) {
            alert(e.message);
        }
    }
}

const App = {
    init() {
        Transaction.all.forEach((transction) => {
            DOM.addTransaction(transction);
        });

        DOM.updateBalance();
    },
    reload() {
        DOM.clearTransactions();
        App.init();
    }
}

App.init();