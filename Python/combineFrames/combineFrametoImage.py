from PIL import Image
import cv2
from natsort import natsorted
from glob import glob
import os
import argparse

parser = argparse.ArgumentParser(description='ImageFrameHandler')
parser.add_argument('--task', default='combine', type=str, help='Task')

def mergeFrameToImage_method1(inputpath,outputpath):
    files = natsorted(glob(os.path.join(inputpath, '*.jpg'))
                      + glob(os.path.join(inputpath, '*.JPG'))
                      + glob(os.path.join(inputpath, '*.png'))
                      + glob(os.path.join(inputpath, '*.PNG')))
    txtfiles = []
    for file_ in files:
        f = os.path.splitext(os.path.split(file_)[-1])[0]
        txtfiles.append(f)
    imageNum = int(len(files)/4)
    print(f"Frames Number {len(files)} combine to {imageNum} Images.")
    imgId = 0
    for x in range(imageNum):

        img_01 = Image.open(f"{inputpath}/{txtfiles[imgId]}.jpg")
        imgId += 1
        img_02 = Image.open(f"{inputpath}/{txtfiles[imgId]}.jpg")
        imgId += 1
        img_03 = Image.open(f"{inputpath}/{txtfiles[imgId]}.jpg")
        imgId += 1
        img_04 = Image.open(f"{inputpath}/{txtfiles[imgId]}.jpg")
        imgId += 1

        img_01_size = img_01.size
        img_02_size = img_02.size
        img_03_size = img_02.size
        img_02_size = img_02.size
        new_im = Image.new('RGB', (2*img_01_size[0],2*img_01_size[1]), (250,250,250))
        new_im.paste(img_01, (0,0))
        new_im.paste(img_02, (img_01_size[0],0))
        new_im.paste(img_03, (0,img_01_size[1]))
        new_im.paste(img_04, (img_01_size[0],img_01_size[1]))
        new_im.save(f"{outputpath}/{x+1}.png", "PNG")
        # new_im.show()

def splitImage_method1(inputpath,outputpath):
    files = natsorted(glob(os.path.join(inputpath, '*.jpg'))
                      + glob(os.path.join(inputpath, '*.JPG'))
                      + glob(os.path.join(inputpath, '*.png'))
                      + glob(os.path.join(inputpath, '*.PNG')))
    i = 1
    for file_ in files:
        img = cv2.imread(file_)
        x,y,c = img.shape
        frame1 = img[0:int(x/2), 0:int(y/2)]
        frame2 = img[0:int(x/2), int(y/2):y]
        frame3 = img[int(x/2):x, 0:int(y/2)]
        frame4 = img[int(x/2):x, int(y/2):y]
        cv2.imwrite(f"{outputpath}/{i}.png", frame1)
        i += 1
        cv2.imwrite(f'{outputpath}/{i}.png', frame2)
        i += 1
        cv2.imwrite(f'{outputpath}/{i}.png', frame3)
        i += 1
        cv2.imwrite(f'{outputpath}/{i}.png', frame4)
        i += 1
    print(f"Extracted {len(files)} Output to {i-1} Frames.")

def mergeFrameToImage_method2(inputpath,outputpath):
    files = natsorted(glob(os.path.join(inputpath, '*.jpg'))
                      + glob(os.path.join(inputpath, '*.JPG'))
                      + glob(os.path.join(inputpath, '*.png'))
                      + glob(os.path.join(inputpath, '*.PNG')))
    txtfiles = []
    for file_ in files:
        f = os.path.splitext(os.path.split(file_)[-1])[0]
        txtfiles.append(f)
    imageNum = int(len(files)-3)
    print(imageNum)
    imgId = 0
    for x in range(imageNum):
        if(imgId == 0):
            img_01 = Image.open(f"{inputpath}/{txtfiles[imgId]}.jpg")
            imgId += 1
            img_02 = Image.open(f"{inputpath}/{txtfiles[imgId]}.jpg")
            imgId += 1
            img_03 = Image.open(f"{inputpath}/{txtfiles[imgId]}.jpg")
            imgId += 1
            img_04 = Image.open(f"{inputpath}/{txtfiles[imgId]}.jpg")
            imgId += 1
        else:
            img_01 = Image.open(f"{inputpath}/{txtfiles[imgId-3]}.jpg")
            img_02 = Image.open(f"{inputpath}/{txtfiles[imgId-2]}.jpg")
            img_03 = Image.open(f"{inputpath}/{txtfiles[imgId-1]}.jpg")
            img_04 = Image.open(f"{inputpath}/{txtfiles[imgId]}.jpg")
            imgId += 1
        img_01_size = img_01.size
        img_02_size = img_02.size
        img_03_size = img_02.size
        img_02_size = img_02.size
        new_im = Image.new('RGB', (2*img_01_size[0],2*img_01_size[1]), (250,250,250))
        new_im.paste(img_01, (0,0))
        new_im.paste(img_02, (img_01_size[0],0))
        new_im.paste(img_03, (0,img_01_size[1]))
        new_im.paste(img_04, (img_01_size[0],img_01_size[1]))
        new_im.save(f"{outputpath}/{x+1}.png", "PNG")
        # new_im.show()

def splitImage_method2(inputpath,outputpath):
    files = natsorted(glob(os.path.join(inputpath, '*.jpg'))
                      + glob(os.path.join(inputpath, '*.JPG'))
                      + glob(os.path.join(inputpath, '*.png'))
                      + glob(os.path.join(inputpath, '*.PNG')))
    i = 1
    for file_ in files:
        img = cv2.imread(file_)
        x,y,c = img.shape
        frame1 = img[0:int(x/2), 0:int(y/2)]
        frame2 = img[0:int(x/2), int(y/2):y]
        frame3 = img[int(x/2):x, 0:int(y/2)]
        frame4 = img[int(x/2):x, int(y/2):y]
        if (i==1):
            cv2.imwrite(f"{outputpath}/{i}.png", frame1)
            i += 1
            cv2.imwrite(f'{outputpath}/{i}.png', frame2)
            i += 1
            cv2.imwrite(f'{outputpath}/{i}.png', frame3)
            i += 1
            cv2.imwrite(f'{outputpath}/{i}.png', frame4)
            i += 1
        else:
            cv2.imwrite(f'{outputpath}/{i}.png', frame4)
            i += 1

def renameFile(inputpath,outputpath):
    files = natsorted(glob(os.path.join(inputpath, '*.jpg'))
                      + glob(os.path.join(inputpath, '*.JPG'))
                      + glob(os.path.join(inputpath, '*.png'))
                      + glob(os.path.join(inputpath, '*.PNG')))
    i = 1
    for file_ in files:
        img = cv2.imread(file_)
        cv2.imwrite(f'{outputpath}/{i}.png', img)
        i += 1


args = parser.parse_args()

if(args.task == 'combine'):
    mergeFrameToImage("/content/FYP_MPRNet/combineFrame","/content/FYP_MPRNet/input")
else:
    splitImage("/content/FYP_MPRNet/output","/content/FYP_MPRNet/extractOutPut")
