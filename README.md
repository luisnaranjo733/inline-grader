# Inline grader

Inline grader is a webapp built to help teachers and TA's grade assignments while referencing a rubric all in the same place.

## Scope

### Why is it useful?

I found that one of the obstacles of grading efficiency (from my own informal self-observations) is having to switch back and forth between lots of browser tabs and windows.

I found myself constantly switching between the grading rubric, the student's assignment that is being graded, Canvas, and the assignment spec . It felt a little bit overwhelming at times.

The inline grader tries to consolidate some of these screens. Now you can reference your rubric in the same place where you make grading marks. There is no longer a need to switch to Canvas multiple times during grading because now you only need to do it once when you are done grading that student. The inline grader gives you a report at the end that you can just copy and paste into Canvas once.

### Audience

I built this web app so that I could grade my client side web dev student's assignments as a TA more easily. But I realized that this has potential to be useful for others.

Here are some ideas for other who might benefit from this:

* All future Info 343 TAs
* Any class that involves programming assignments
* Any class that has discrete assignments that can be described with a hierarchical grading rubric

It is currently coupled to the way Canvas is setup (because the grading report at the end assumes that you want the report flattened and organized under the root level sections, which aligns with Canvas so you can copy and paste). This could change upon further deliberation.

## How to access it

Visit https://luisnaranjo733.github.io/inline-grader/#/

**OR**

1. Clone the repository
2. run npm install
3. run npm start
4. Navigate to localhost:3000 in your browser

## How to use it

1. Paste in the url to your xml rubric
2. Click on submit button
3. You will be taken to the criteria grading page.
4. From here you can *view* a specific grading criteria and *make grading remarks* for the student you are currently grading.
5. You can navigate to the next criteria with the right arrow key. You can navigate back with the left arrow key.
6. When you are done grading, use the up arrow key to view the grading report page. Here you can see the all of the points and comments aggregated under each top level grading section. You can copy and paste each section's comments and grade values into Canvas.
7. You can navigate back to the grading criteria with the down key.

## How to build your own rubric

A grading rubric is defined as an XML document that is composed of rubric, section and criteria tags. If you can describe a grading rubric as a bulleted/ordered list, then that means that you can translate it to an XML format that the inline grader can understand.

Here is the general procedure for creating a grading rubric

1. Write the xml
2. Make sure that it is [syntactically valid](http://codebeautify.org/xmlvalidator).
3. Upload it to private grading repository on github so that you can get a URL to your rubric with access control
4. Try to upload it to the inline grading tool. It does a semantic xml validation test before parsing your xml. If there is something wrong with the xml (semantically), it will let you know via exceptions which you can view in the javascript console.

### Defining the semantic tags that a rubric is composed of

#### rubric

This is the outermost tag of the document. It defines the entire rubric.

```xml
<rubric name="rubric name" />
```

#### section

This tag defines a semantic grading section. Grading sections can contain other grading sections, or they can contain grading criteria (or both!).

Each grading section must contain criteria (although not necessarily as a direct descendant). The sum of each section's criteria, is that section's possible points.

```xml
<section name="grading section name" />
```

#### criteria

This tag defines a grading criteria, the most basic fundamental building blocks to a grading rubric. Each grading criteria is a specific rule that can be applied to a student's assignment.

```xml
<criteria name="criteria name" weight="pointsPossible" />
<criteria name="criteria name" weight="pointsPossible">
	Optional long description goes here
</criteria>
```

### Putting it all together

```xml
<rubric name="Sample assignment rubric">

	<!-- Demonstrate unnested criteria (does not have to have a grading section) -->
	<criteria name="uses modulus correctly" weight="10"/>
    <criteria name="uses ternary operator correctly" weight="10"/>

	<!-- Demonstrate simple rubric structure -->
	<section name="grading section A">
		<criteria name="missing aria landmarks" weight="3"/>
    	<!-- Example of a criteria with a long description -->
		<criteria name="uses aria-polite" weight="2">
        	Make sure that they use the aria-polite correctly. This is critical!
    	</criteria>
	</section>

	<!-- Demonstrate 2 levels of nested sections (can go as deep as you want) -->
	<section name="grading section B">
		<section name="grading section B.1">
			<criteria name="includes html5 doctype" weight="2"/>
			<criteria name="loads normalize" weight="1" />
			<criteria name="loads lodash" weight="2" />
		</section>
	</section>

</rubric>

```

### Another (more formal) way of thinking about a rubric

You can think of a rubric as an *n-nary tree*. In this tree, the root node is the rubric tag. The leaves of the tree are the criteria. Everything in between the rubric and criteria tags are section tags. You can define the direction of the tree so that the leaves on the left are the "top" of the xml rubric, and the leaves on the right are the "bottom" of the xml rubric.

![rubricGraph](http://i.imgur.com/WOmnaLG.png "XML rubric as an n-ary tree")






## How to contribute

Feel free to branch off of master and add a feature, fix a bug, or make some subtle UI improvement!

### Branch history

There is a branch named "prototype" which is the first version of this web app. It works (and I've used it to grade a couple of assignments with success) but there are a few subtle bugs. I built it while I was learning React, and I quickly found that the architecture of the web app was not good.


I decided to rewind my master branch back to the basic create-react-app template and start from scratch. This gave me a chance to rebuild the app with better practices. I built it from scratch in the "v2" branch. Once the "v2" branch matured and became useable end to end, I merged it back into master.

### Where do you come in?

I will put up issues on github to track features/bugs/improvements that are still pending. If you want to help, feel free to branch off of master and work on something. Submit a PR back into master when you are done. Thanks!


		

## Security

This web page is designed to be secure. All of it's state is managed locally with Redux. It never persists your grading rubric anywhere. Every time you want to use the page, you need to provide a url to your xml rubric.

*You should provide a link to the 'raw' xml in a private github repository that you have access to.* As long as you are logged in to github (authenticated and authorized) the inline grader should be able to make a web request to fetch your rubric.

This repository does not contain any sensitive grading rubric information.
