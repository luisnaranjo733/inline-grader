function nameParameterException(value, issue) {
   this.value = value;
   this.message = issue;
   this.toString = function() {
      return this.value + this.message;
   };
}

function descriptionParameterException(value, issue) {
   this.value = value;
   this.message = issue;
   this.toString = function() {
      return this.value + this.message;
   };
}

function pointsPossibleParameterException(value, issue) {
   this.value = value;
   this.message = issue;
   this.toString = function() {
      return this.value + this.message;
   };
}

function sectionPathParameterException(issue) {
    this.issue = issue;
    this.toString = function() {
        return this.issue;
    }
}


export default class Criterion {
    constructor(name, description, pointsPossible, sectionPath) {
       if (typeof name !== "string") {
           throw new nameParameterException(name, 'Name parameter must be a string!');

       }
       if (typeof description !== "string") {
           throw new descriptionParameterException(name, 'description parameter must be a string!');
       }
       if (typeof pointsPossible !== "number") {
           throw new pointsPossibleParameterException(pointsPossible, 'pointsPossible parameter must be a number!');
       }
       if (!Array.isArray(sectionPath)) {
           throw new sectionPathParameterException('sectionPath parameter must be an array!');
       } else if (sectionPath.length > 0) {
           sectionPath.forEach(function(section) {
               if (typeof section !== "string") {
                   throw new sectionPathParameterException('all elements of sectionPath parameter must be strings!');
               }
           });
       };

       // required parameters for construction
        this.name = name;
        this.description = description;
        this.pointsPossible = pointsPossible;
        this.sectionPath = sectionPath;

        this.defaultComments = [];
        // default values for ungraded criteria
        this.pointsEarned = this.pointsPossible || 0;
        this.comment = '';
    }

    // Getter method for this criterion's root section
    // If the criteria has no root section (if the criteria is a direct child of the root tag) return empty string
    get rootSection() {
        return this.sectionPath.length > 0 ? this.sectionPath[0] : ''
    }

    // Reset this criteria's grade values so that it can be reused for the next student
    clearGradeAndComment() {

    }
}