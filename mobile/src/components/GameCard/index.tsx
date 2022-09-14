import { TouchableOpacity, TouchableOpacityProps, ImageBackground, ImageSourcePropType } from "react-native";

import { styles } from "./style";


export interface GameCardProps {
    id: string;
    name: string;
    ads: string;
    cover: ImageSourcePropType
}

interface Props {
    data: GameCardProps
}

export function GameCard({data, ...rest}: Props){
    return(
        <TouchableOpacity style={styles.container}{...rest}>
            <ImageBackground
            style={styles.cover}
            source={data.cover}
            />
        </TouchableOpacity>
    )
}