from pdfminer.high_level import extract_text
import os

current_directory = os.getcwd()
pdf_filename = "analysis/epstein-documents-943-pages.pdf"
pdf_path = os.path.join(current_directory, pdf_filename)
extracted_text = extract_text(pdf_path)

print(extracted_text[0:1000])

with open('extracted_text.txt', 'w', encoding='utf-8') as file:
    # Write the extracted text into the file
    file.write(extracted_text)