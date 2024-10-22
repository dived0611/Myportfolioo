import React from "react";
import "./Loading.css";
const Loading = () => {
    const [percentage, setPercentage] = React.useState(0);

    React.useEffect(() => {
        const radius = 90;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;
        const interval = setInterval(() => {
            setPercentage((prev) => {
                if (prev < 100) {
                    return prev + 1;

                } else {
                    clearInterval(interval);
                    document.querySelector(".loading").style.display = "none";
                    return 100;
                }
            });
        }, 30);

        return () => clearInterval(interval);
    }, []);


    return (

        <div className="loading">
            <h1 className="percentage" >{percentage}%</h1>
        </div>


      

    );
};

export default Loading;