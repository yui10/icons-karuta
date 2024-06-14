import { randomInt } from "@/utils/commonUtil";
import { randomIcons } from "@/utils/iconUtil";
import { useState } from "react"
import { IconData } from "simple-icons/sdk"

const useIconsService = () => {
    const [correctIcon, setCorrectIcon] = useState<IconData>();
    const [iconList, setIconList] = useState<IconData[]>([]);
    const [restIconList, setRestIconList] = useState<IconData[]>([]);

    const init = (baseIconList: IconData[], size: number) => {
        let _iconList = randomIcons(baseIconList, size);
        setIconList([..._iconList]);
        setCorrectIcon(_iconList[randomInt(0, _iconList.length - 1)]);
        setRestIconList([..._iconList]);
    }

    const onNext = () => {
        const _restIconList = restIconList.filter((icon) => icon.title !== correctIcon?.title);
        const _correctIcon = _restIconList[randomInt(0, _restIconList.length - 1)];
        setRestIconList(_restIconList);
        setCorrectIcon(_correctIcon);
    }

    return { correctIcon, iconList, restIconList, init, onNext };
}

export default useIconsService;
