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
    },
    open() {
        // Abrir modal
        // Adicionar a classe "active" ao modal
        document
            .querySelector('.modal-overlay')
            .classList
            .add("active");
    },
    close() {
        // Fechar modal
        // Retirar a classe "active" do modal
        document
            .querySelector(".modal-overlay")
            .classList
            .remove("active");
    }
};

// Minha lista de objetos de transações
const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021'
    },
    {
        id: 2,
        description: 'Criação website',
        amount: 500000,
        date: '23/01/2021'
    },
    {
        id: 1,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021'
    }
];

// Meu objeto da transação
const Transaction = {
    incomes() {
        // Somar todas as entradas
    },
    expenses() {
        // Somar todas as saídas
    },
    total() {
        // Total = entradas - saídas
    }
};

// Substituir os dados do HTML com os dados do JS
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
    }
}

transactions.forEach((transction) => {
    DOM.addTransaction(transction);
})