let string = "";

let buttons = document.querySelectorAll(".btn")

Array.from(buttons).forEach((button) => {
    button.onmouseover = () => {
        button.style.backgroundColor = "#131313";
        button.style.color = "white";
    };
    button.onmouseout = () => {
        button.style.backgroundColor = "white";
        button.style.color = "black";
    };
    
    button.addEventListener('click', (val) => {
        if (val.target.innerHTML == '=')
        {
            string = eval(string);
            document.querySelector(".input").value = string

        }
        else if (val.target.innerHTML == 'c')
            {
                string = "";
                document.querySelector(".input").value = string
    
            }
        else if (val.target.innerHTML == 'x')
            {
                string = string.slice(0, -1);
                document.querySelector(".input").value = string;
            }
        else {
            string += val.target.innerHTML
            document.querySelector(".input").value = string
        }

    })
})