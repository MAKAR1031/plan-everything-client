export default function sort(o1, o2) {
    if (o1.order === o2.order) {
        return 0;
    }
    if (o1.order > o2.order) {
        return 1;
    } else {
        return -1;
    }
};