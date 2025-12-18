import React, { useState, useEffect, useRef } from "react";
import { Minus, Plus } from "lucide-react";

interface QuantityCountProps {
  value?: number;
  initial?: number; // optional starting value
  min?: number; // optional min value (default: 1)
  max?: number; // optional max stock
  onChange?: (value: number) => void; // callback when quantity changes
}

const QuantityCount: React.FC<QuantityCountProps> = ({
  initial = 1,
  min = 1,
  max,
  onChange,
}) => {
  const [count, setCount] = useState<number>(initial);
  const [lastValid, setLastValid] = useState<number>(initial);
  const isFirstRender = useRef(true);

  const handleDecrement = () => {
    setCount((prev) => {
      const newVal = Math.max(min, prev - 1);
      return newVal;
    });
  };

  const handleIncrement = () => {
    setCount((prev) => {
      const newVal = max ? Math.min(prev + 1, max) : prev + 1;
      return newVal;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(Number(e.target.value));
  };

  const validateAndCommit = () => {
    let newVal = count;

    if (isNaN(newVal) || newVal < min) {
      newVal = lastValid; // rollback
    } else if (max && newVal > max) {
      newVal = max;
    }

    setCount(newVal);
    setLastValid(newVal);

    if (newVal !== lastValid) {
      onChange?.(newVal);
    }
  };

  // Notify parent only after validation (not while typing)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // when count changes from buttons, validate directly
    validateAndCommit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <div className="border border-neutral-300 py-2 px-3 rounded-xl flex justify-between items-center gap-2 w-32 h-10">
      <Minus
        width={20}
        height={20}
        onClick={handleDecrement}
        className="cursor-pointer"
      />
      {/* <input
        type="number"
        value={count}
        onChange={handleInputChange}
        onBlur={validateAndCommit} // rollback on blur
        onKeyDown={(e) => e.key === "Enter" && validateAndCommit()} // rollback on Enter
        className="w-12 text-center font-bold outline-none"
      /> */}
      <span className="text-lg font-bold">{count}</span>
      <Plus
        width={20}
        height={20}
        onClick={handleIncrement}
        className="cursor-pointer"
      />
    </div>
  );
};

export default QuantityCount;
