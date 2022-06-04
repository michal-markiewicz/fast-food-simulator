"use strict";

const startStopButton = document.getElementById('start-stop');
startStopButton.addEventListener('click', userInput);

const cookingTimeInput = document.getElementById('cooking-time-input');
const customerArrivalTimeInput = document.getElementById('customer-arrival-time-input');

class UI 
{
    printInfo()
    {
        const orderAreaQueue = document.getElementById('order-area-queue');
        setInterval(() => {
            orderAreaQueue.textContent = "in queue: " + orderTaker.queue.length;
        }, 0)
    }
}
const ui = new UI();

class Simulation
{
    constructor()
    {
        this.on = false;
        this.cookingTime = null;
        this.customerArrivalTime = null;
        this.customers = [];
    }

    start()
    {
        this.on = true;
        this.customerArrivalLoop();
        this.customerTaskLoop();
        orderTaker.takeOrders();
        ui.printInfo();
    }

    stop()
    {
        this.on = false;
    }

    customerArrivalLoop()
    {
        const loop = setInterval(() => {
            this.on ? this.customers.push(new Customer) : clearInterval(loop);
        }, this.customerArrivalTime)
    }

    customerTaskLoop()
    {
        const loop = setInterval(() => {
            if (this.on)
            {
                this.customers.forEach((customer) => {
                    switch (customer.taskPhase)
                    {
                        case "Not started":
                            customer.completeTask();
                            break;
                        case "In progress":
                            break; 
                        case "Completed":
                            break;
                    }
                })   
            }
            else 
            {
                clearInterval(loop);
            }
        }, 5)
    }
}

const simulation = new Simulation();

class Customer 
{
    constructor()
    {
        this.task = "Order";
        this.taskPhase = "Not started";
    }

    completeTask()
    {
        switch (this.task)
        {
            case "Order":
                this.order();
                this.taskPhase = "In progress";
                break;
            case "Pickup":
                break;
            case "Dining":
                break;
        }
    }

    order()
    {
        orderTaker.queue.push(this);
    }
}

class OrderTaker
{
    constructor()
    {
        this.queue = [];
        this.newOrderNumber = 0;
    }

    takeOrders()
    {
        const orderAreaNewOrder = document.getElementById('order-area-new-order');
        let orderTakerBusy = false;

        const loop = setInterval(() => {
                if (simulation.on)
                {
                    if (orderTakerBusy === false && this.queue.length > 0)
                    {
                        orderTakerBusy = true;
                        setTimeout(() => {
                            this.queue[0].taskPhase = "Completed";
                            this.queue.shift();
                            this.newOrderNumber++;
                            orderAreaNewOrder.textContent = `new order: #${this.newOrderNumber}`;
                            orderTakerBusy = false;
                        }, 30)
                    }
                }
                else 
                {
                    clearInterval(loop);
                }
            }, 0)
    }
}

const orderTaker = new OrderTaker();

function userInput()
{
    if (simulation.on === true)
    {
        simulation.stop()
        startStopButton.textContent = "Start";
    }
    else if (simulation.on === false)
    {
        const validation = checkUserInput();

        if (validation !== "no error")
        {
            return alert(validation);
        }

        simulation.cookingTime = cookingTimeInput.value;
        simulation.customerArrivalTime = customerArrivalTimeInput.value;

        simulation.start();
        startStopButton.textContent = "Stop";
    }
}

function checkUserInput()
{
    if (cookingTimeInput.value === "" || customerArrivalTimeInput.value === "")
    {
        return "You need to fill out every input.";
    }

    if (Number.isNaN(+cookingTimeInput.value) || Number.isNaN(+customerArrivalTimeInput.value))
    {
        return "Every input needs to be a number.";
    }

    if (Number(cookingTimeInput.value) <= 0 || Number(customerArrivalTimeInput.value) <= 0)
    {
        return "Every input must be more than 0 ms.";
    }

    return "no error";
}