import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

const Calculator = () => {
    const [sellingPrice, setSellingPrice] = useState('');
    const [conveyancingFee, setConveyancingFee] = useState(0);
    const [agentCommission, setAgentCommission] = useState(0);
    const [advertisingCost, setAdvertisingCost] = useState(0);
    const [propertyTypeCommission, setPropertyTypeCommission] = useState(0);
    const [selectedPropertyType, setSelectedPropertyType] = useState(null);
    const [showSelect, setShowSelect] = useState(false); // State to control the visibility of the Select component

    useEffect(() => {
        calculateCosts(sellingPrice);
    }, [propertyTypeCommission, sellingPrice]);

    const handleInputChange = (e) => {
        const price = e.target.value;
        setConveyancingFee(1000);
        setSellingPrice(price);
    };

    const calculateCosts = (price) => {
        const parsedPrice = parseFloat(price);
        const commission = parsedPrice * propertyTypeCommission;
        const priceIncrement = (parsedPrice / 100) * 40;
        setAgentCommission(commission);
        setAdvertisingCost(priceIncrement);
    };

    const handlePropertyTypeClick = (commission, propertyType) => {
        setPropertyTypeCommission(commission);
        setSelectedPropertyType(propertyType);
        setShowSelect(true); // Show the Select component when a property type is selected
    };

    const sellingCost = conveyancingFee + agentCommission + (advertisingCost / 100);
    const netSaleValue = parseFloat(sellingPrice) - sellingCost;

    return (
        <div>
            <h2>Real Estate Costs Calculator</h2>

            <label>
                What's your property type?
                <div className="flex gap-4">
                    <span
                        id="house"
                        className={`p-5 border-cyan-400 border cursor-pointer ${selectedPropertyType === "house" ? 'bg-cyan-400' : ''}`}
                        onClick={() => handlePropertyTypeClick(0.0250, "house")}
                    >
                        House - 2.50%
                    </span>
                    <span
                        id="townhouse"
                        className={`p-5 border-cyan-400 border cursor-pointer ${selectedPropertyType === "townhouse" ? 'bg-cyan-400' : ''}`}
                        onClick={() => handlePropertyTypeClick(0.0250, "townhouse")}
                    >
                        Town House - 2.50%
                    </span>
                    <span
                        id="unit"
                        className={`p-5 border-cyan-400 border cursor-pointer ${selectedPropertyType === "unit" ? 'bg-cyan-400' : ''}`}
                        onClick={() => handlePropertyTypeClick(0.0300, "unit")}
                    >
                        Unit - 3.00%
                    </span>
                </div>
            </label>
            <br />
            <div className='mt-8'>
                <label>
                    Selling Price:
                    <input type="number" value={sellingPrice} onChange={handleInputChange} />
                </label>
            </div>
            <div>
                <h3>Results:</h3>
                <p>Conveyancing Fee: ${conveyancingFee}</p>
                <p>Agent Commission: ${agentCommission ? agentCommission.toFixed(2) : 0}</p>
                <p>Advertising Cost: ${advertisingCost ? (advertisingCost / 100).toFixed(2) : 0}</p>
                <p>Selling Cost: ${sellingCost ? Math.round(sellingCost) : 0}</p>
                <p>Net Sale Value: ${netSaleValue ? sellingPrice < 1000 ? Math.round(netSaleValue) : Math.floor(netSaleValue) : 0}</p>
            </div>
        </div>
    );
};

export default Calculator;
