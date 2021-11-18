# Interactive list sorter
Sorts items using quicksort and input from the browser as a comparator.

## Description
Sorts a list of items choosen by the user. The user will pick between two items at a time until the list is sorted.

## Implementation
Uses promises as a comparator in the sorting algorithm, so that it waits until the promise is resolved.

The algorithm asks to compare two items, and this is delegated to the user which can pick between the two options.
The promise is resolved when the user clicks on an option, this lets the program continue until done.

## Credits
- Mr. MechaFlex
