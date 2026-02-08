const { useState, useEffect } = React;

function App() {
    // Состояния
    const [targetAmount, setTargetAmount] = useState(210000);
    const [currentAmount, setCurrentAmount] = useState(0);
    const [incomeAmount, setIncomeAmount] = useState('');
    const [incomeDescription, setIncomeDescription] = useState('');
    const [history, setHistory] = useState([]);

    // Загрузка данных из localStorage при загрузке
    useEffect(() => {
        const savedTarget = localStorage.getItem('targetAmount');
        const savedCurrent = localStorage.getItem('currentAmount');
        const savedHistory = localStorage.getItem('incomeHistory');

        if (savedTarget) setTargetAmount(parseInt(savedTarget));
        if (savedCurrent) setCurrentAmount(parseInt(savedCurrent));
        if (savedHistory) setHistory(JSON.parse(savedHistory));
    }, []);

    // Сохранение данных в localStorage при изменении
    useEffect(() => {
        localStorage.setItem('targetAmount', targetAmount);
        localStorage.setItem('currentAmount', currentAmount);
        localStorage.setItem('incomeHistory', JSON.stringify(history));
    }, [targetAmount, currentAmount, history]);

    // Добавление дохода
    const addIncome = () => {
        const amount = parseInt(incomeAmount);
        if (!amount || amount <= 0) {
            alert('Введите корректную сумму');
            return;
        }

        const newIncome = {
            id: Date.now(),
            amount: amount,
            description: incomeDescription || 'Без описания',
            date: new Date().toLocaleString('ru-RU')
        };

        setCurrentAmount(prev => prev + amount);
        setHistory(prev => [newIncome, ...prev]);
        setIncomeAmount('');
        setIncomeDescription('');
    };

    // Удаление дохода из истории
    const deleteIncome = (id, amount) => {
        if (window.confirm('Удалить этот доход?')) {
            setCurrentAmount(prev => prev - amount);
            setHistory(prev => prev.filter(item => item.id !== id));
        }
    };

    // Изменение цели
    const updateTarget = () => {
        const newTarget = prompt('Введите новую цель (руб.):', targetAmount);
        if (newTarget && !isNaN(newTarget) && newTarget > 0) {
            setTargetAmount(parseInt(newTarget));
        }
    };

    // Расчет процента выполнения
    const progressPercentage = Math.min(Math.round((currentAmount / targetAmount) * 100), 100);

    // Создание DOM элементов
    const createElement = (tag, props, ...children) => {
        const element = document.createElement(tag);

        Object.keys(props || {}).forEach(key => {
            if (key === 'className') {
                element.className = props[key];
            } else if (key === 'style' && typeof props[key] === 'object') {
                Object.assign(element.style, props[key]);
            } else if (key.startsWith('on')) {
                element[key.toLowerCase()] = props[key];
            } else {
                element.setAttribute(key, props[key]);
            }
        });

        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else if (Array.isArray(child)) {
                child.forEach(c => element.appendChild(c));
            } else if (child) {
                element.appendChild(child);
            }
        });

        return element;
    };

    // Рендеринг
    const render = () => {
        const root = document.getElementById('root');
        root.innerHTML = '';

        const container = createElement('div', { className: 'container' });

        // Заголовок
        const title = createElement('h1', null,
            createElement('i', { className: 'fas fa-chart-line' }),
            ' Трекер доходов'
        );
        container.appendChild(title);

        // Секция цели
        const targetSection = createElement('section', { className: 'target-section' });
        targetSection.appendChild(createElement('h2', null, 'Цель'));

        const targetDisplay = createElement('div', { className: 'target-display' });

        const progressContainer = createElement('div', { className: 'progress-container' });
        const progressBar = createElement('div', {
            className: 'progress-bar',
            style: { width: `${progressPercentage}%` }
        }, `${progressPercentage}%`);
        progressContainer.appendChild(progressBar);
        targetDisplay.appendChild(progressContainer);

        const progressLabels = createElement('div', { className: 'progress-labels' });
        progressLabels.appendChild(createElement('span', {
            className: 'current-amount-label'
        }, `${currentAmount.toLocaleString()} руб.`));
        progressLabels.appendChild(createElement('span', {
            className: 'target-amount-label'
        }, `Цель: ${targetAmount.toLocaleString()} руб.`));
        targetDisplay.appendChild(progressLabels);

        targetSection.appendChild(targetDisplay);

        const updateButton = createElement('button', { onClick: updateTarget },
            createElement('i', { className: 'fas fa-bullseye' }),
            ' Изменить цель'
        );
        targetSection.appendChild(updateButton);

        container.appendChild(targetSection);

        // Секция добавления дохода
        const addIncomeSection = createElement('section', { className: 'add-income' });
        addIncomeSection.appendChild(createElement('h2', null, 'Добавить доход'));

        const amountGroup = createElement('div', { className: 'form-group' });
        amountGroup.appendChild(createElement('label', { htmlFor: 'amount' }, 'Сумма (руб.)'));
        const amountInput = createElement('input', {
            type: 'number',
            id: 'amount',
            value: incomeAmount,
            placeholder: 'Например: 5000'
        });
        amountInput.oninput = (e) => setIncomeAmount(e.target.value);
        amountGroup.appendChild(amountInput);
        addIncomeSection.appendChild(amountGroup);

        const descGroup = createElement('div', { className: 'form-group' });
        descGroup.appendChild(createElement('label', { htmlFor: 'description' }, 'Описание (необязательно)'));
        const descTextarea = createElement('textarea', {
            id: 'description',
            placeholder: 'Зарплата, фриланс, подарок...',
            rows: '3',
            value: incomeDescription
        });
        descTextarea.oninput = (e) => setIncomeDescription(e.target.value);
        descGroup.appendChild(descTextarea);
        addIncomeSection.appendChild(descGroup);

        const addButton = createElement('button', { onClick: addIncome },
            createElement('i', { className: 'fas fa-plus-circle' }),
            ' Добавить доход'
        );
        addIncomeSection.appendChild(addButton);

        container.appendChild(addIncomeSection);

        // Секция истории
        const historySection = createElement('section', { className: 'history-section' });
        historySection.appendChild(createElement('h2', null, 'История доходов'));

        const totalIncome = createElement('div', { className: 'total-income' },
            'Всего накоплено: ',
            createElement('span', { style: { color: '#2E7D32' } }, `${currentAmount.toLocaleString()} руб.`)
        );
        historySection.appendChild(totalIncome);

        const historyList = createElement('div', { className: 'history-list' });

        if (history.length === 0) {
            historyList.appendChild(createElement('div', { className: 'empty-history' }, 'История доходов пуста'));
        } else {
            history.forEach(item => {
                const historyItem = createElement('div', { className: 'history-item' });

                const historyInfo = createElement('div', { className: 'history-info' });
                historyInfo.appendChild(createElement('div', null, item.description));
                historyInfo.appendChild(createElement('div', { className: 'history-date' }, item.date));
                historyItem.appendChild(historyInfo);

                historyItem.appendChild(createElement('div', { className: 'history-amount' }, `+${item.amount.toLocaleString()} руб.`));

                const deleteBtn = createElement('button', {
                    className: 'delete-btn',
                    onClick: () => deleteIncome(item.id, item.amount)
                }, createElement('i', { className: 'fas fa-trash' }));
                historyItem.appendChild(deleteBtn);

                historyList.appendChild(historyItem);
            });
        }

        historySection.appendChild(historyList);
        container.appendChild(historySection);

        root.appendChild(container);
    };

    // Подписываемся на обновления состояния
    useEffect(() => {
        render();
    }, [targetAmount, currentAmount, incomeAmount, incomeDescription, history]);

    // Первоначальный рендер
    render();

    return null;
}

// Запускаем приложение
ReactDOM.render(React.createElement(App), document.getElementById('root'));