import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'edit-photo-dialog',
  templateUrl: './edit-photo-dialog.component.html',
  styleUrls: ['./edit-photo-dialog.component.scss'],
})
export class EditPhotoDialogComponent implements OnInit {
  constructor() {}

  gifs = [
    'https://media4.giphy.com/media/CAxbo8KC2A0y4/giphy.gif?cid=6efe4c6dthor61c00z65vssuhw2i2siybpxw3kc0l4vknfo5&rid=giphy.gif',
    'https://media4.giphy.com/media/39onL3yTmFw8I8agYk/giphy.gif?cid=6efe4c6dthor61c00z65vssuhw2i2siybpxw3kc0l4vknfo5&rid=giphy.gif',
    'https://media1.giphy.com/media/l4pTfx2qLszoacZRS/giphy.gif?cid=6efe4c6dthor61c00z65vssuhw2i2siybpxw3kc0l4vknfo5&rid=giphy.gif',
    'https://media3.giphy.com/media/iJJ6E58EttmFqgLo96/giphy-preview.gif?cid=6efe4c6dfs9zpeopilqyw2ryjd3wehaaoz8tgfxos28lnhit&rid=giphy-preview.gif',
    'https://media1.giphy.com/media/l2YWs1NexTst9YmFG/giphy.gif?cid=6efe4c6dg56y5uaohwh1yq408y71npmkocya19prkhwobuxk&rid=giphy.gif',
    'https://media1.giphy.com/media/laIzn1CqsmSdO/giphy.gif?cid=6efe4c6dg56y5uaohwh1yq408y71npmkocya19prkhwobuxk&rid=giphy.gif',
    'https://media1.giphy.com/media/KP18FsRKq0LWo/giphy.gif?cid=6efe4c6dg56y5uaohwh1yq408y71npmkocya19prkhwobuxk&rid=giphy.gif',
    'https://media3.giphy.com/media/iCjhRTjzokCje/giphy.gif?cid=6efe4c6dg56y5uaohwh1yq408y71npmkocya19prkhwobuxk&rid=giphy.gif',
    'https://media4.giphy.com/media/20ANgYG4KfSakvutbO/giphy.gif?cid=6efe4c6dfs9zpeopilqyw2ryjd3wehaaoz8tgfxos28lnhit&rid=giphy.gif',
    'https://media2.giphy.com/media/d2lcHJTG5Tscg/giphy.gif?cid=6efe4c6dfs9zpeopilqyw2ryjd3wehaaoz8tgfxos28lnhit&rid=giphy.gif',
    'https://media2.giphy.com/media/McNHek8WfyEA8/giphy.gif?cid=6efe4c6dfs9zpeopilqyw2ryjd3wehaaoz8tgfxos28lnhit&rid=giphy.gif',
    'https://media3.giphy.com/media/Ph8OWoJA2M3eM/giphy.gif?cid=6efe4c6dfs9zpeopilqyw2ryjd3wehaaoz8tgfxos28lnhit&rid=giphy.gif',
    'https://media2.giphy.com/media/2WxWfiavndgcM/giphy.gif?cid=6efe4c6dfs9zpeopilqyw2ryjd3wehaaoz8tgfxos28lnhit&rid=giphy.gif',
    'https://media2.giphy.com/media/3o7aTvhUAeRLAVx8vm/giphy.gif?cid=6efe4c6dfs9zpeopilqyw2ryjd3wehaaoz8tgfxos28lnhit&rid=giphy.gif',
    'https://media0.giphy.com/media/xT1XGyvQIcC3oVP8pq/giphy.gif?cid=6efe4c6dfs9zpeopilqyw2ryjd3wehaaoz8tgfxos28lnhit&rid=giphy.gif',
  ];

  stickers = [
    'https://media1.giphy.com/media/1wlWtflbknYsTbvahh/giphy.gif?cid=6efe4c6dvx80jhcf9rhj55k7iim9e61bjwfp3ng2otm28du7&rid=giphy.gif',
    'https://media1.giphy.com/media/JsDtKXMBOAJt1mJYaF/giphy.gif?cid=6efe4c6dvx80jhcf9rhj55k7iim9e61bjwfp3ng2otm28du7&rid=giphy.gif',
    'https://media1.giphy.com/media/tFqKgC5KSoZRm/giphy.gif?cid=6efe4c6dvx80jhcf9rhj55k7iim9e61bjwfp3ng2otm28du7&rid=giphy.gif',
    'https://media0.giphy.com/media/FxAYkQqdw63hC/giphy.gif?cid=6efe4c6dvx80jhcf9rhj55k7iim9e61bjwfp3ng2otm28du7&rid=giphy.gif',
    'https://media3.giphy.com/media/pCFBuW79MCiy7T4vhv/giphy.gif?cid=6efe4c6dvx80jhcf9rhj55k7iim9e61bjwfp3ng2otm28du7&rid=giphy.gif',
    'https://media2.giphy.com/media/l4pTbf0kTHnrBtr9u/giphy.gif?cid=6efe4c6dvx80jhcf9rhj55k7iim9e61bjwfp3ng2otm28du7&rid=giphy.gif',
    'https://media3.giphy.com/media/MNZOD614zTgQ1qhkKT/giphy.gif?cid=6efe4c6dvx80jhcf9rhj55k7iim9e61bjwfp3ng2otm28du7&rid=giphy.gif',
    'https://media3.giphy.com/media/EUNEHOZhspZRu/giphy.gif?cid=6efe4c6dvx80jhcf9rhj55k7iim9e61bjwfp3ng2otm28du7&rid=giphy.gif',
    'https://media1.giphy.com/media/l4FGxli967GNywSd2/giphy.gif?cid=6efe4c6dvx80jhcf9rhj55k7iim9e61bjwfp3ng2otm28du7&rid=giphy.gif',
  ];

  ngOnInit(): void {}
}
