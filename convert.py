import json

def process_line(line, brand):
    
    # Split the line into the initials and the name part
    initials, name = line.split(' ', 1)

    possible_letters = {'a', 'd', 's', 'o', 'c', 'n', "*"}
    
    # Create a dictionary with all possible letters set to False initially
    initials_dict = {char: False for char in possible_letters}
    
    # Update the dictionary for the letters that are present in the initials
    for char in initials.lower():
        if char in initials_dict:
            initials_dict[char] = True
    # Format the name correctly
    name = name.title()

    # Create the final dictionary
    result = initials_dict
    result['name'] = name
    result['brand'] = brand
    return result

def txt_to_json(input_file, output_file):
    data = []
    brand = ""
    brandline = False
    with open(input_file, 'r') as file:
        for line in file:
            line = line.strip()
            if not line:
                brandline = True
            elif brandline:
                brand = line
                brandline = False
            elif line and not brandline:  # Only process non-empty lines
                data.append(process_line(line, brand))
                print(line)


    
    with open(output_file, 'w') as json_file:
        json.dump(data, json_file, indent=4)

# Usage example
input_file = 'input.txt'  # Replace with your input file name
output_file = 'output.json'  # Replace with your desired output file name
txt_to_json(input_file, output_file)
