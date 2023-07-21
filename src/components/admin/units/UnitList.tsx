import { UnitItem } from ".";
import { IUnit } from "../../../interfaces";

interface Props {
    units: IUnit[];
}
export const UnitList = ({ units }: Props) => units && units.map((unit) => (<UnitItem key={unit.id} unit={unit} />));