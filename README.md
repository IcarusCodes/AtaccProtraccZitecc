# AtaccProtraccZitecc
#### *A Protractor on Jasmine Automation Framework*

## Note to interviewers 

I will use this readme to also state some of my opinions on automation/code as well as trying to directly interact with  the interviewers, hello there!

Since the preferred language was either *JavaScript* or *PHP* I have decided to use the **former**
in conjunction with **Protractor**, however note that I *have not* used Protractor - or **any** FE/UI testing - for more
than 3 years(API team).

I have tried to structure this project following a **POM design** as well as I could, there might still be a lot of 
refactoring to be done and maybe not the best JS practices since I haven't used it in so long.


## Documentation
Documenting your code is **very** important, there is an unofficial belief that there should be one comment for *roughly* 
every 10 lines of code.    
 
 **I do abide by this**, but I also believe that when you read a page object 
you should be able to **understand** all the web elements of the page just from the **variable names** and when trying 
 to understand the functionalities of the page you should be able to do so **just by reading the method names**.

With that said I have provided some comments where I've felt it might have been needed, but *moreso* I've tried to name 
the variables and methods in a verbose way.


## Setup

`npm i` To install all dev dependencies;

`webdriver-manager update` This works if protractor is properly installed.

`webdriver-manager start --detach` Can be run without the *detach* flag.


## Running and reporting

Test cases can be run by issuing the following command:  
  
`protractor conf.js`


Since I didn't have very much time to spend on this project(follow the commits) I have used some readily
available code for the reporting part. I have fixed [this](https://praveendavidmathew.medium.com/creating-html-reports-for-protractor-7d9830ebf428) old broken code
and integrated it into this framework.

The main report is ProtractorTestReport.html:
![html report](https://i.imgur.com/HRbshXO.png)


But jasmine has some cli reporting too:
![cli report](https://i.imgur.com/yjrmbAA.png)

## Test Cases:  

| Scenario | Type | Expected behavior |
| :---:         |     :---:      |          :---: |
| Should complete a valid order using wire payment, for 3 orange M shirts.   | Positive     | The price should be calculated correctly and the order should be completed.    |
| Should complete a valid order using check payment, for 5 L printed dresses.     | Positive      | The price should be calculated correctly and the order should be completed.      |
| Should complete a valid order using wire payment for 3 S shirts and 2 M evening dresses.   | Positive     | The price should be calculated correctly and the order should be completed.    |
| Should try adding -5 T-Shirts to cart | Negative     | The value -5 should be converted to 5 and the order should be completed.  |
| Should remove the product from cart and try to proceed to checkout    | Negative      | After removing the product, an error message stating the cart is empty should be displayed.     |
| Negative should proceed to checkout with an empty cart   | Negative     | An error message stating the cart is empty should be displayed.    |

#### Final boomer note: I know that the company is called Zitech and not Zitecc, it is a play on words - just like Protecc was replaced by Protracc - a reference to Protractor. If unfamilliar with the meme or just confused about the project name, please see [this](https://knowyourmeme.com/memes/he-protec-but-he-also-attac).