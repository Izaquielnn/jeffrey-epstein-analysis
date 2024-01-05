import spacy
import os

def extract_person_names_from_file(file_path):
    # Load the spaCy English language model
    nlp = spacy.load("en_core_web_sm")

    # Read text from the file
    with open(file_path, 'r', encoding='utf-8') as file:
        text = file.read()

    # Split the text into chunks of a specified size (e.g., 500,000 characters)
    chunk_size = 500000
    chunks = [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]

    # Process each chunk using spaCy
    unique_person_names = set()
    for chunk in chunks:
        doc = nlp(chunk)
        unique_person_names.update([ent.text for ent in doc.ents if ent.label_ == "PERSON"])

    listed_names = list(unique_person_names)
    cleaned_names = [name for name in listed_names if name.strip() and not name.startswith("cid:")]

    return cleaned_names

current_directory = os.getcwd()
text_filename = "analysis/generated_docs/extracted_text.txt"
file_path = os.path.join(current_directory, text_filename)
extracted_names = extract_person_names_from_file(file_path)


with open('extracted_names.txt', 'w', encoding='utf-8') as file:
    for name in extracted_names:
        file.write(name + '\n')
