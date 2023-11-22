// components/DisplayBox.tsx
import React, { useState } from "react";

const DisplayBox: React.FC = () => {
    const [showBox, setShowBox] = useState(false);

    return (
        <div>
            <button onClick={() => setShowBox(!showBox)}>Toggle Box</button>
            {showBox && (
                <div className="overlay">
                    <div className="box">This is shh the box content</div>
                </div>
            )}
        </div>
    );
};

export default DisplayBox;
