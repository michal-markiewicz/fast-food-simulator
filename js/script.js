"use strict";

const startStopButton = document.getElementById('start-stop');
startStopButton.addEventListener('click', userInput);

const cookingTimeInput = document.getElementById('cooking-time-input');
const customerArrivalTimeInput = document.getElementById('customer-arrival-time-input');

class App
{
    constructor()
    {
        this.on = false;
        this.cookingTime = null;
        this.customerArrivalTime = null;
    }
}

const app = new App();

function userInput()
{
    if (app.on === true)
    {
        app.on = false;
        startStopButton.textContent = "Start";
    }
    else if (app.on === false)
    {
        const validation = checkUserInput();
        if (validation !== "no error")
        {
            return alert(validation);
        }

        app.on = true;
        app.cookingTime = cookingTimeInput.value;
        app.customerArrivalTimeInput = customerArrivalTimeInput.value;

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
