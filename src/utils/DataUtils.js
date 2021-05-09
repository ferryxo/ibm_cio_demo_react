
export const getTableData = (groups) => {
    const data = [];
    groups.forEach(g => {
        const { id, group, member } = g;    
        for (const person of member) {
            const { name, color } = person;
            data.push({ groupId: id, group, memberId: person.id, name, color });
        }
    });
    return data;
}
