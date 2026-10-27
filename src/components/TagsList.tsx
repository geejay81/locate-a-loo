import type { Toilet } from "@/types/toilet";
import { Badge } from "./ui/badge";

const TagsList = ({ toilet }: { toilet: Toilet }) => {
    const { wheelchair, fee, changingTable, openingHours } = toilet;

    if (!wheelchair && !fee && !changingTable && !openingHours) {
        return null;
    }
    
    return (
        <div className="flex flex-wrap gap-2">
            {wheelchair === "yes" && (
                <Badge className="bg-blue-100 text-blue-800 shadow-2xl">
                    ♿ Accessible
                </Badge>
            )}

            {fee === "no" && (
                <Badge className="bg-green-100 text-green-800 shadow-2xl">
                    🆓 Free
                </Badge>
            )}

            {changingTable === "yes" && (
                <Badge className="bg-yellow-100 text-yellow-800 shadow-2xl">
                    👶 Baby Changing
                </Badge>
            )}

            {openingHours && (
                <Badge className="bg-purple-100 text-purple-800 shadow-2xl">
                    🕒 {openingHours}
                </Badge>
            )}
        </div>
    );
}

export default TagsList;