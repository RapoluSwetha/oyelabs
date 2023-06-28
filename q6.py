import random
unordered_missing_list=[]
while len(unordered_missing_list)<99:
    i=random.randint(1,100)
    if i not in unordered_missing_list:
        unordered_missing_list.append(i)
missinglist=sorted(unordered_missing_list)
originallist=[]
for i in range(1,101):
    originallist.append(i)
print(originallist)
print(missinglist)
for i in range(0,100):
    if originallist[i]!=missinglist[i]:
        print(originallist[i])
        break