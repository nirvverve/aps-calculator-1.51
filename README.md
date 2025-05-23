v1.6.0

Implemented advanced Henderson-Hasselbalch equation for accurate pH prediction after sodium bicarbonate dosing.
Acid dosing logic now combines all acid recommendations into a single, post-bicarb dose when raising alkalinity, eliminating double acid dosing.
Introduced balancing chemical priority: only one balancing chemical (alkalinity, then CYA, then calcium) is dosed per visit; others are deferred to the "Next Service Appointment" section.
Improved summary card order: sodium bicarbonate, then acid, then sanitizer, then other chems.
Fixed color coding for acid (pink) and calcium (blue) cards in the summary.
Enhanced UI clarity and reduced user confusion by preventing simultaneous recommendations for multiple balancing chems.
Various bug fixes and code refactoring for maintainability.

v1.4.2

Fat finger protection 
min / max values for all parameters 
50k max on capacity
30.0 ppm on FAC
300.0 ppm on CYA
300.0 ppm on TA
1000.0 ppm on CH
10000 ppm on TDS
10000 ppm on Salt

Will now only accept values in 10 ppm increments
Will throw an error in results area if these numbers are exceeded, in the language selected.  

Acid / Alkalinity - 
There is a correction for alkalinity when it comes to lowering pH that was incorrect, showing higher acid doses than normal for pH adjustment.  This has been corrected.

Added handling for super high alkalinity (above 160 ppm).  25.64 oz of acid per 10k gallons @ 10 ppm.  
Removed duplicate acid dosing when lowering alkalinity and pH at same visit.  

v1.2.1

In results - water balance plan - the wording in italics "These changes need to be made at the next visit....." now appears only once when multiple balance chems are selected. 

v1.2.0

Multilingual Support: Now available in English, Spanish, and Italian
State Selection Memory: state preference is remembered between visits
Improved UI: Button-based state selection for easier use, especially on mobile devices

APS Residential Pool Chemistry Calculator v1.1.0
Specifically for residential pools only

**OVERVIEW**
The APS Pool Chemistry Calculator is a specialized tool designed to help pool service professionals and homeowners maintain optimal water chemistry in residential swimming pools. This calculator provides precise chemical dosing recommendations based on test results, pool size, and geographic location.

**PRIORITIZED CHEMICAL DOSING FOR WATER BALANCE**
When multiple water balance parameters are out of balance, the calculator prioritizes corrections in a specific order to ensure safe and effective treatment:

pH and Total Alkalinity: These are addressed first as they affect sanitizer efficiency and water comfort
Calcium Hardness: Adjusted to prevent scaling or corrosion
Cyanuric Acid (Stabilizer): Adjusted to protect chlorine from UV degradation

If multiple parameters need correction, the calculator will recommend addressing the most critical ones immediately and schedule others for subsequent visits, preventing chemical conflicts and over-correction.

**STATE DEFINED TARGETS**
Parameter	    	   
pH  7.6 (Fla) 7.5 (Tx and Az)
Total Alkalinity 80 ppm (Fla) 120 ppm (Tx and Az)
Calcium Hardness 300 ppm (Fla) 400 ppm (Tx and Az)
Cyanuric Acid	  50 ppm (Fla) 80 ppm (Tx and Az)

These targets were carefully selected to provide the best balance between water comfort, equipment protection, and sanitizer efficiency in each region's specific climate conditions.

**CUSTOMIZED SANITIZER DOSING**
Sanitizer Dosing Logic:
The calculator employs advanced sanitizer dosing logic based on:
    The 5% Rule: Minimum Free Chlorine (FC) should be 5% of Cyanuric Acid (CYA) level
    UV Loss Factor: Accounts for chlorine degradation due to sunlight exposure, varying by season

Regional Product Differences:
    Florida: Recommends 12.5% liquid chlorine (sodium hypochlorite)
    Arizona/Texas: Recommends 73% calcium hypochlorite (granular)
    This approach ensures adequate sanitization while accounting for stabilizer levels and regional preferences.

LSI:
    The calculator provides LSI calculations to determine if water is balanced, corrosive, or scale-forming. This helps protect pool surfaces and equipment from damage while maintaining water clarity.





