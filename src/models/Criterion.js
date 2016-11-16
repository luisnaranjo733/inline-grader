export default class Criterion {
    constructor(name, description, pointsPossible, sectionPath) {
       // required parameters for construction
        this.name = name;
        this.description = description;
        this.pointsPossible = pointsPossible; // string
        this.sectionPath = sectionPath;

        // set a default comment
        this.defaultComments = [
            {
                text: '-',
                deduction: '0'
            }
        ];
        // default values for ungraded criteria
        this.pointsEarned = this.pointsPossible; // string
        this.comment = '';
    }

    // Getter method for this criterion's root section
    // If the criteria has no root section (if the criteria is a direct child of the root tag) return empty string
    get rootSection() {
        return this.sectionPath.length > 0 ? this.sectionPath[0] : ''
    }
}