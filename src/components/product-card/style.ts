import Colors from "@styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        borderRadius: 5,
        backgroundColor: Colors.paleOrange, //Note: image has white background, so changed card background color
        padding: 0
    },
    detailContainer: {
        marginHorizontal: 12,
        marginVertical: 12
    },
    image: {
        height: 100,
        width: '100%',
        borderTopLeftRadius: 5,
        borderColor: Colors.white,
        borderTopRightRadius: 5,
        borderWidth: 1
    },
    title: {
        color: Colors.tigerHallOrange,
        fontSize: 12,
        fontWeight: '700',
        marginVertical: 4,
    },
    subTitle: {
        color: Colors.black,
        fontSize: 18,
        fontWeight: '700',
        marginVertical: 4,
    },
    description: {
        color: Colors.grey,
        fontSize: 14,
        fontWeight: '600',
        marginVertical: 4,
    },
    footerLabel: {
        color: Colors.tigerHallOrange,
        fontSize: 14,
        fontWeight: '600',
    }
})