import React from "react";
import "./BuisnessSummary.css";
const BuisnessSummary = () => {
  const url = `https://i.ibb.co/YtHM7WY/award-pngrepo-com.png`;
  return (
    <div>
      <div className="b-sum">
        <div>
          <img src="https://svgshare.com/i/hoU.svg" title="" />
          <h1>16</h1>
          <p>Specialist</p>
        </div>
        <div>
          <img src="https://www.svgrepo.com/show/50222/happy.svg" title="" />
          <h1>1256</h1>
          <p>Happy Clients</p>
        </div>
        <div>
          <img src="https://svgshare.com/i/hpc.svg" title="" />
          <h1>16</h1>
          <p>26 Meetings</p>
        </div>
        <div>
          <img src="https://www.svgrepo.com/show/121237/award.svg" title="" />
          <h1>13</h1>
          <p>Awards</p>
        </div>
      </div>
    </div>
  );
};

export default BuisnessSummary;
