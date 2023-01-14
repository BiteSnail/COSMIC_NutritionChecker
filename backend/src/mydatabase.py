import os.path
import pickle

class DATABASE:
    def __init__(self):
        if os.path.exists('./resources/db.plk') and os.path.exists('./resources/keywords.plk'):
            with open('./resources/db.plk', 'rb') as file:
                self.__db = pickle.load(file)
            with open('./resources/keywords.plk', 'rb') as file:
                self.__keywords = pickle.load(file)
        else:
            self.__db = []
            self.__keywords = []
    
    def sync_disk(self):
        with open('./resources/db.plk', 'wb') as file:
            pickle.dump(self.__db, file)
        with open('./resources/keywords.plk', 'wb') as file:
            pickle.dump(self.__keywords, file)
    
    def is_searched(self, desc_kor:str) -> bool:
        return desc_kor in self.__keywords

    def find(self, desc_kor:str) -> list | None:
        result_list = [item for item in self.__db if desc_kor in item['DESC_KOR']]
        return result_list if len(result_list) > 0 else None 
    
    def update(self, new_item:dict | list, keyword:str="") -> None:
        if isinstance(new_item, dict):
            new_item = [new_item]
        if keyword not in self.__keywords:
            self.__keywords.append(keyword)
        db_code_list = [item['FOOD_CD'] for item in self.__db]
        self.__db.extend([item for item in new_item if item['FOOD_CD'] not in db_code_list])
        self.sync_disk()