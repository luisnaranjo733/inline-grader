export default class Criterion {
    constructor(name, description, pointsPossible, sectionPath) {
       if (typeof name !== "string") {
           throw 'Name parameter must be a string!';
       }
       if (typeof description !== "string") {
           throw 'description parameter must be a string!';
       }
       if (typeof pointsPossible !== "number") {
           throw 'pointsPossible parameter must be a number!';
       }
       if (!Array.isArray(sectionPath)) {
           throw 'sectionPath parameter must be an array!'
       } else if (sectionPath.length > 0) {
           sectionPath.forEach(function(section) {
               if (typeof section !== "string") {
                   throw 'all elements of sectionPath parameter must be strings!';
               }
           });
       };

       // required parameters for construction
        this.name = name;
        this.description = description;
        this.pointsPossible = pointsPossible;
        this.sectionPath = sectionPath;

        this.defaultComments = [];

        this.clearGradeAndComment();
    }

    // Getter method for this criterion's root section
    // If the criteria has no root section (if the criteria is a direct child of the root tag) return empty string
    get rootSection() {
        return this.sectionPath.length > 0 ? this.sectionPath[0] : ''
    }

    // Reset this criteria's grade values so that it can be reused for the next student
    clearGradeAndComment() {
        // default values for ungraded criteria
        this.pointsEarned = this.pointsPossible || 0;
        this.comment = '';
        
    }
}