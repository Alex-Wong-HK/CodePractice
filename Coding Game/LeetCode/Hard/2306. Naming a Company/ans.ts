//@ts-nocheck
function distinctNames(ideas: string[]): number {
    let count = 0;
    const set = new Set<string>();

    for (let i = 0; i < ideas.length; i++) {
        for (let j = i + 1; j < ideas.length; j++) {
            const ideaA = ideas[i];

            const ideaB = ideas[j];

            const newIdeaA = ideaB[0] + ideaA.slice(1);

            const newIdeaB = ideaA[0] + ideaB.slice(1);
            if (!ideas.includes(newIdeaA) && !ideas.includes(newIdeaB)) {
                const nameA = `${newIdeaA} ${newIdeaB}`;
                const nameB = `${newIdeaB} ${newIdeaA}`;
                if (!set.has(nameA) && !set.has(nameB)) {
                    count += 2;
                    set.add(nameA);
                    set.add(nameB)
                }
            }
        }
    }

    return count;
};
