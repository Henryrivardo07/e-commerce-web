import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import QuantityCount from "../../components/QuantityCount";
import { type CartItem } from "@/types/Cart.type";
import { getValidImage } from "@/lib/getValidImage";

// Define Props
interface CartItemProps {
  storeName: string;
  storeIcon?: string;
  CartItems: CartItem[];
  checkedItems?: number[]; // ✅ array of checked product IDs
  onCheck?: (itemId: number, checked: boolean) => void;
  onRemove?: (itemId: number) => void;
  onQuantityChange?: (itemId: number, qty: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  storeName,
  storeIcon = "/icons/Store.svg",
  CartItems,
  checkedItems,
  onCheck,
  onQuantityChange,
  onRemove,
}) => {
  // ✅ derive store checkbox state
  const allChecked = CartItems.every((ci) => checkedItems?.includes(ci.id));
  const someChecked =
    CartItems.some((ci) => checkedItems?.includes(ci.id)) && !allChecked;

  const handleStoreCheck = (checked: boolean) => {
    CartItems.forEach((ci) => onCheck?.(ci.id, checked));
  };

  return (
    <div className="border border-neutral-300 rounded-xl p-4 mb-4 md:mb-6">
      {/* Store Section */}
      <div className="flex items-center gap-3 mb-4">
        <Checkbox
          checked={allChecked ? true : someChecked ? "indeterminate" : false}
          onCheckedChange={(val) => handleStoreCheck(!!val)}
        />
        <Image
          src={getValidImage(storeIcon)}
          alt={storeName}
          width={20}
          height={20}
          className="object-cover"
          unoptimized
        />
        <h3 className="text-sm md:text-md">{storeName}</h3>
      </div>

      {/* Product Section */}
      {CartItems.map((ci, i) => (
        <div
          className={`flex items-start gap-3 mb-3 ${
            i > 0 && "border-t border-t-neutral-300 pt-3"
          }`}
          key={ci.id}
        >
          <Checkbox
            checked={checkedItems?.includes(ci.id)}
            onCheckedChange={(val) => onCheck?.(ci.id, !!val)}
          />
          <div className="flex flex-col md:flex-row md:justify-between w-full">
            <div className="flex items-center gap-2">
              <Image
                src={getValidImage(ci.product.images[0])}
                alt={ci.product?.title}
                width={80}
                height={80}
                className="object-cover rounded-md"
                unoptimized
              />
              <div>
                <h4 className="text-sm md:text-lg font-bold">
                  {ci.product.title}
                </h4>
                <p className="text-xs md:text-md">{"Product Category"}</p>
              </div>
            </div>

            <div className="flex md:flex-col justify-between items-center md:items-end gap-3">
              <h4 className="text-sm md:text-lg font-bold">
                Rp{ci.product.price.toLocaleString("id-ID")}
              </h4>
              <div className="flex items-center gap-4">
                <Trash2
                  className="text-neutral-600 cursor-pointer"
                  width={18}
                  onClick={() => onRemove?.(ci.id)}
                />
                <QuantityCount
                  onChange={(qty) => onQuantityChange?.(ci.id, qty)}
                  value={ci.qty}
                  initial={ci.qty}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
