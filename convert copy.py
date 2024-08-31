import json

def process_line(line):
    
    # Split the line into the initials and the name part
    name = line

    possible_letters = {'a', 'd', 's', 'o', 'c', 'n', "*"}
    
    # Create a dictionary with all possible letters set to False initially
    initials_dict = {char: False for char in possible_letters}

    name = name.title()

    # Create the final dictionary
    result = initials_dict
    result['name'] = name
    result['brand'] = "PEEL"
    return result

def txt_to_json(input_file, output_file):
    data = []
    with open(input_file, 'r') as file:
        for line in file:
            line = line.strip()
            if line:  # Only process non-empty lines
                data.append(process_line(line))
                print(line)


    
    with open(output_file, 'w') as json_file:
        json.dump(data, json_file, indent=4)

# Usage example
input_file = 'input2.txt'  # Replace with your input file name
output_file = 'output.json'  # Replace with your desired output file name
txt_to_json(input_file, output_file)
