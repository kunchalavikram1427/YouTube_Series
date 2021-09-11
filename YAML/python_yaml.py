# pip install pyyaml
import yaml

# Reading a YAML file
with open('all_datatypes.yml') as f:
    yaml_contents = yaml.load_all(f, Loader=yaml.FullLoader)
    for yaml_content in yaml_contents:
        for key, value in yaml_content.items():
            print(f"{key}: {value}")


# Python dump() method serializes a Python object into a YAML stream


users = [{'name': 'John Doe', 'occupation': 'gardener'},
         {'name': 'Lucy Black', 'occupation': 'teacher'}] # List of dictionaries
print(type(users)) # <class 'list'>

# Serializing  
print(yaml.dump(users))
print(type(yaml.dump(users))) # <class 'str'>

# Writing to a file
with open('users.yaml', 'w') as f:
   data = yaml.dump(users, f)


