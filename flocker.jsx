﻿#target Photoshop/* Photoshop Javascripting Scatterer   SjG 2011 <samuelg@fogbound.net>   */ #include "./optsys.jsx";#include "./utilities.jsx";var optconf = {	'fields':{          'copies':            {             'input':'slider',             'label':'Number of Copies',			'default':30,			'min':1,			'max':500,             'numbertype':'int'            }, 		'scale':{             'input':'checkbox',			'label':'Randomly Scale Copies?',			'shortlabel':'Scale',			'default':true,			},         'sort':{             'input':'checkbox',			'label':'Sort layers by size?',			'shortlabel':'Sort',			'default':true,			},		'min_scale':{			'label':'Minimum Scale %',			'default':15,			'input':'slider',			'min':1,			'max':100,			'numbertype':'int'			},		'rotate':{             'input':'checkbox',			'label':'Randomly Rotate Copies?',			'shortlabel':'Rotate',			'default':true,			},		'max_angle':{			'label':'Maximum Rotation (Deg)',			'default':30,			'input':'slider',			'min':0,			'max':180,			'numbertype':'int'			},		},	'ui':{		'title':'Options',        'width':700,		'fieldsets':[             {                 'title':'Flocker',                 'columns':[                    ['copies']                 ]             },			{				'title':'Scaling',                 'tag':'scaleopts',				'columns':[					['scale'],					['min_scale']				]			},			{				'title':'Layering',                 'tag':'sortopts',				'columns':[					['sort'],				]			},			{				'title':'Rotation',                 'tag':'rotopts',				'columns':[					['rotate'],					['max_angle']				]			},		]		}};var opts = new OptObject(optconf);var d=new Date();var namestr = 'Flocker run '+d.toString();var defaultRulerUnits = preferences.rulerUnits;preferences.rulerUnits = Units.PIXELS;var originalLayer = activeDocument.activeLayer;try {   var SB = activeDocument.selection.bounds;   }catch (e){   app.activeDocument.selection.selectAll();}var originalSelect = activeDocument.selection;var originalBounds = originalSelect.bounds;var doc_width = parseInt(app.activeDocument.width);	var doc_height = parseInt(app.activeDocument.height);var sel_width = parseInt(originalBounds[2]) - parseInt(originalBounds[0]);var sel_height = parseInt(originalBounds[3]) - parseInt(originalBounds[1]);$.writeln('doc_width,doc_height: '+doc_width+','+doc_height+', sel_width,sel_height: '+sel_width+','+sel_height);if (opts.doDialog(optconf))	{	opts.writeToMetadata('Metadata '+namestr);	try {		var group = app.activeDocument.layerSets.add();         var scale = 1;		group.name = namestr;         for (var i=0;i<opts.copies;i++)            {            var startLayer = useLayerOrGroup(originalLayer, -1, true, i);            var tmpLayer = startLayer.duplicate();            var height = parseInt(tmpLayer.bounds[2] - tmpLayer.bounds[0]);            var width = parseInt(tmpLayer.bounds[3] - tmpLayer.bounds[1]);            centerLayer(doc_width, doc_height, tmpLayer);            if (opts.scale)                {                scale = (100 - Math.random()*(100 - opts.min_scale))/*/100*/;                tmpLayer.resize(scale, scale);                tmpLayer.name = scale;                }            if (opts.rotate)                {                var angle = 2 * Math.random()*opts.max_angle - opts.max_angle;                tmpLayer.rotate(angle);                }                        tmpLayer.translate(-doc_width/2 + Math.random()*doc_width, -doc_height/2 + Math.random()*doc_height);                        // sort            if (opts.scale && opts.sort && i>0)                {                var finding = true;                var k = 0;                var placed = false;                while ( finding && k<group.artLayers.length)                    {                    var s = group.artLayers[k].name + 0.0;                    if (scale > s)                        {                        tmpLayer.move(group.artLayers[k],ElementPlacement.PLACEBEFORE);                        finding=false;                        placed = true;                        }                    k = k+1;                    }                if (! placed && k == group.artLayers.length)                    {                    tmpLayer.move(group.artLayers[k-1],ElementPlacement.PLACEAFTER);                    }                }            else                {                tmpLayer.move(group,ElementPlacement.INSIDE);                }            // Photoshop CS5 crashes a lot, so save it frequently            /*            if (i%5 == 0)                app.activeDocument.save();            */            }	} catch (exception)		{		alert(exception);		}	}preferences.rulerUnits = defaultRulerUnits;alert('Run completed.');