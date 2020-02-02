const mongoose   = require("mongoose");
const passport   = require("passport");
const User       = require("../models/user");
const Setting    = require("../models/setting");
const Service    = require("../models/service");
const Case       = require("../models/casestudy");
const News       = require("../models/news");
const logger     = require("../utils/logger");

let output = {
    seedUsers: () => {
            // Generate default data.
        let users = [
            {
                username: "Techmeleon",
                password: "TECH@tm101",
                admin: true
            }
        ]

        // Remove all users and add default users.
        User.remove({}, err => {
            if(err){
                console.log(err);
            } else {
                users.forEach(function(seed) {
                    let newUser = new User({username: seed.username, admin: seed.admin});
                    User.register(newUser, seed.password, function(err, user) {
                        logger.info("New user: " + user.username)
                    });
                });
            };
        });
    },
    seedSettings: (env) => {
        let settings = {
                env: "development",
                underConstruction: false
        }

        // Remove settings before running
        Setting.remove({}, err => {
            if(err){
                logger.error(err)
            } else {
                Setting.create(settings, err => {
                    if(err) {
                        logger.error(err)
                    } else {
                        logger.info("settings applied")
                    }
                });
            };
        });
    },
    seedServices: () => {
        let services = [
            {
                serviceName: "Landscaping",
                landingImage: "/resources/img/services/landing_landscaping.png",
                landingText: "We design, plan and install everything you need to create the perfect outside space. We can install paths, turf, flowerbeds and more.",
                contentList: [
                    {
                        name: "main text",
                        content: "<p>Landscaping is a fantastic opportunity to frame your house in an attractive, practical way that makes the most of space and natural features, increases the appeal of time spent in the garden, and definitely adds value to the property.</p><p>Homes on every street show the difference that landscaping can make to similar properties: neglected and overgrown, or updated imaginatively, requiring less maintenance.</p><p>Natural Groundcare can supply everything required to make the most of the land around your home. We provide a full range of treated timber products and quality stone.</p><p>Summerhouses, decking, paved walkways and patios can quickly turn a bland lawn into very attractive seasonal entertaining space with suntrap corners.</p><p>We can complete all ground works, lay new turf and even seed.</p>",
                        type: "text",
                        order: 1
                    },
                    {
                        name: "main image",
                        content: "/resources/img/services/landscaping.png",
                        type: "image",
                        order: 2
                    }
                ],
                order: 1
            },
            {
                serviceName: "Japanese Knotweed",
                landingImage: "/resources/img/services/landing_japanese-knotweed.jpg",
                landingText: "Our skilled team has a vast knowledge in dealing with Knotweed. Over time with the correct treatment we can eventually eradicate them.",
                contentList: [
                    {
                        name: "main text",
                        content: "<p>We offer invasive weed removal and management services across the south west</p> <p>We specialise in the removal of persistent invasive plants including:</p><ul><li>Japanese Knotweed</li><li>Giant Hogweed</li><li>Himalayan Balsam</li><li>Ragwort</li><li>Rhododendron</li></ul><p>These weeds are notorious for spreading quickly and can damage wildlife, buildings, roads and plant life and if not completely and professionally removed will continue to return and create problems.</p><p>If you know or think you may have any of the above invasive plants then please contact us and our experts will be happy to help.</p>",
                        type: "text",
                        order: 1
                    },
                    {
                        name: "main image",
                        content: "/resources/img/services/japknot.jpg",
                        type: "image",
                        order: 2
                    }
                ],
                order: 2
            },
            {
                serviceName: "Weed Control",
                landingImage: "/resources/img/services/landing_weed-control.jpg",
                landingText: "Invasive weeds can be very difficult to control. We have many years of experience in removing this unwanted pest.",
                contentList: [
                    {
                        name: "main text",
                        content: "<p>We offer invasive weed removal and management services across the south west</p> <p>We specialise in the removal of persistent invasive plants including</p><ul><li>Japanese Knotweed</li><li>Giant Hogweed</li><li>Himalayan Balsam</li><li>Ragwort</li><li>Rhododendron</li></ul><p>These weeds are notorious for spreading quickly and can damage wildlife, buildings, roads and plant life and if not completely and professionally removed will continue to return and create problems.</p><p>If you know or think you may have any of the above invasive plants then please contact us and our experts will be happy to help.</p>",
                        type: "text",
                        order: 1
                    },
                    {
                        name: "main image",
                        content: "/resources/img/services/weedcontrol.jpg",
                        type: "image",
                        order: 2
                    }
                ],
                order: 3
            },
            {
                serviceName: "Tree Surgery",
                landingImage: "/resources/img/services/landing_treework.jpg",
                landingText: "We cut and remove trees in your garden. Stopping trees from outgrowing their space is essential to the perfect outdoor space.",
                contentList: [
                    {
                        name: "main text",
                        content: "<p>Trained in tree care. Our Aborist services include; Pruning, including crown reduction; thinning and lifting; wood chipping (on site or taken away) felling; line clearance work</p><ul><li>Tree Pruning/Felling</li><li>Stump Removal</li><li>Tree Surgery</li><li>Tree Surveys</li><p>Natural Groundcare is dedicated to the maintenance of trees in the urban & natural environment, providing a professional service with the best experience available. We can work on any size of project without losing the care that has made our reputation.</p>",
                        type: "text",
                        order: 1
                    },
                    {
                        name: "main image",
                        content: "/resources/img/services/treesurgery.jpg",
                        type: "image",
                        order: 2
                    }
                ],
                order: 4
            },
            {
                serviceName: "Fencing",
                landingImage: "/resources/img/services/landing_fencing.png",
                landingText: "We can install new fencing, repair old. Whatever you need we can provide and install at a competitive price.",
                contentList: [
                    {
                        name: "main text",
                        content: "<p>Frame and finish your garden and outside spaces with some of our great quality garden fencing in various styles to suit any new design.</p><p>We can supply every type, from traditional New England picket fencing to formal spear-topped black ironwork, and every variety of lapboard panels with decorative capping, plus gates, trellises for an attractive touch and all fixings.</p><p>We supply fence panels and railings that are treated to protect against water ingress, and are available in different colours or wood-stain finishes.</p><p>Natural Groundcare supplies timber products, with a reputation for excellence and quality in the fencing industry.</p>",
                        type: "text",
                        order: 1
                    },
                    {
                        name: "main image",
                        content: "/resources/img/services/fencing.jpg",
                        type: "image",
                        order: 2
                    }
                ],
                order: 5
            },
            {
                serviceName: "General Maintenance",
                landingImage: "/resources/img/services/landing_maintenance.jpg",
                landingText: "Professional mowing and garden maintenance services are available. Allowing you time to relax while we keep on top of all your gardening needs.",
                contentList: [
                    {
                        name: "main text",
                        content: "<p>At Natural Groundcare we create a plan to keep your outside space maintained all year round. Whether its just from mowing and trimming or planting your flower displays for all year round maintenance and upkeep we create a custom plan to your needs and ensure we completed on time throughout the months of the year.</p><p>WE also provide specialist lawn care services from our sister company <a href='https://www.lawnamental.co.uk'>Lawnamental<a>",
                        type: "text",
                        order: 1
                    },
                    {
                        name: "main image",
                        content: "/resources/img/services/gardenmaint.png",
                        type: "image",
                        order: 2
                    }
                ],
                order: 6
            }
        ]

        // Remove settings before running
        Service.remove({}, err => {
            if(err){
                logger.error(err)
            } else {
                Service.create(services, err => {
                    if(err) {
                        logger.error(err)
                    } else {
                        logger.info("services created")
                    }
                });
            };
        });
    },
    seedCases: () => {
        Service.findOne({serviceName: "General Maintenance"}).exec(function(err, gm) {
            if (err) {
                console.log(err)
            }
            Service.findOne({serviceName: "Japanese Knotweed"}).exec(function(err, kw) {
                let cases = [
                    {
                        caseName: "Saint Brides Major",
                        mainImage: "/resources/img/cases/Saint Brides Major/2018-05-02-PHOTO-00000014.jpg",
                        shortDescription: "Scarification + Feed and weed treatment",
                        sector: "Residential",
                        keyFacts: ["Ogmoor","Lawn improvement"],
                        service: [gm._id],
                        caseContent: [
                            {
                                name: "image 1",
                                order: 1,
                                type: "image",
                                content: "/resources/img/cases/Saint Brides Major/2018-05-02-PHOTO-00000015.jpg"
                            },
                            {
                                name: "image 2",
                                order: 2,
                                type: "image",
                                content: "/resources/img/cases/Saint Brides Major/2018-05-02-PHOTO-00000017.jpg"
                            },
                            {
                                name: "image 3",
                                order: 3,
                                type: "image",
                                content: "/resources/img/cases/Saint Brides Major/2018-05-02-PHOTO-00000018.jpg"
                            },
                            {
                                name: "image 4",
                                order: 4,
                                type: "image",
                                content: "/resources/img/cases/Saint Brides Major/2018-05-02-PHOTO-00000019.jpg"
                            },
                            {
                                name: "image 5",
                                order: 5,
                                type: "image",
                                content: "/resources/img/cases/Saint Brides Major/2018-05-02-PHOTO-00000020.jpg"
                            },
                            {
                                name: "image 6",
                                order: 6,
                                type: "image",
                                content: "/resources/img/cases/Saint Brides Major/2018-05-02-PHOTO-00000021.jpg"
                            },

                        ]
                    },
                    {
                        caseName: "Afan Valley Campsite",
                        mainImage: "/resources/img/cases/Afan Valley Campsite/2018-05-02-PHOTO-00000009.jpg",
                        shortDescription: "Plug Aeration, Scarification, Top dressing, feed and weed",
                        sector: "Commercial",
                        keyFacts: ["Afan Valley"],
                        service: [gm._id],
                        caseContent: [
                            {
                                name: "image 1",
                                order: 1,
                                type: "image",
                                content: "/resources/img/cases/Afan Valley Campsite/2018-05-02-PHOTO-00000010.jpg"
                            },
                            {
                                name: "image 2",
                                order: 2,
                                type: "image",
                                content: "/resources/img/cases/Afan Valley Campsite/2018-05-02-PHOTO-00000022.jpg"
                            },
                            {
                                name: "image 3",
                                order: 3,
                                type: "image",
                                content: "/resources/img/cases/Afan Valley Campsite/2018-05-02-PHOTO-00000023.jpg"
                            },
                            {
                                name: "image 4",
                                order: 4,
                                type: "image",
                                content: "/resources/img/cases/Afan Valley Campsite/2018-05-02-PHOTO-00000024.jpg"
                            },
                            {
                                name: "image 5",
                                order: 5,
                                type: "image",
                                content: "/resources/img/cases/Afan Valley Campsite/2018-05-02-PHOTO-00000025.jpg"
                            },
                            {
                                name: "image 6",
                                order: 6,
                                type: "image",
                                content: "/resources/img/cases/Afan Valley Campsite/2018-05-02-PHOTO-00000026.jpg"
                            },
                        ]
                    },
                    {
                        caseName: "Weed and feed in Penclawdd",
                        mainImage: "/resources/img/cases/Weed and feed in Penclawdd/2018-05-02-PHOTO-00000011.jpg",
                        shortDescription: "Plug Aeration, feed and weed",
                        sector: "Residential",
                        keyFacts: ["Penclawdd"],
                        service: [gm._id],
                        caseContent: [
                            {
                                name: "image 1",
                                order: 1,
                                type: "image",
                                content: "/resources/img/cases/Weed and feed in Penclawdd/2018-05-02-PHOTO-00000012.jpg"
                            },
                            {
                                name: "image 2",
                                order: 2,
                                type: "image",
                                content: "/resources/img/cases/Weed and feed in Penclawdd/2018-05-02-PHOTO-00000013.jpg"
                            },
                            {
                                name: "image 3",
                                order: 3,
                                type: "image",
                                content: "/resources/img/cases/Weed and feed in Penclawdd/2018-05-02-PHOTO-00000016.jpg"
                            },
                            {
                                name: "image 4",
                                order: 4,
                                type: "image",
                                content: "/resources/img/cases/Weed and feed in Penclawdd/2018-05-02-PHOTO-00000027.jpg"
                            },
                        ]
                    },
                    {
                        caseName: "Knotweed Removal Bishopston",
                        mainImage: "/resources/img/cases/Knotweed Removal Bishopston/2016-06-15-PHOTO-00000004.jpg",
                        shortDescription: "Knotweed removal",
                        sector: "Residential",
                        keyFacts: ["Bishopston"],
                        service: [kw._id],
                        caseContent: [
                            {
                                name: "image 1",
                                order: 1,
                                type: "image",
                                content: "/resources/img/cases/Knotweed Removal Bishopston/2016-06-15-PHOTO-00000005.jpg"
                            },
                            {
                                name: "image 2",
                                order: 2,
                                type: "image",
                                content: "/resources/img/cases/Knotweed Removal Bishopston/2016-06-15-PHOTO-00000006.jpg"
                            },
                            {
                                name: "image 3",
                                order: 3,
                                type: "image",
                                content: "/resources/img/cases/Knotweed Removal Bishopston/2016-06-15-PHOTO-00000007.jpg"
                            },
                            {
                                name: "image 4",
                                order: 4,
                                type: "image",
                                content: "/resources/img/cases/Knotweed Removal Bishopston/2016-06-15-PHOTO-00000008.jpg"
                            },
                        ]
                    }
                ]

                // Remove settings before running
                Case.remove({}, err => {
                    if(err){
                        logger.error(err)
                    } else {
                        Case.create(cases, err => {
                            if(err) {
                                logger.error(err)
                            } else {
                                logger.info("cases created")
                            }
                        });
                    };
                });
            });
        });
    },
    seedNews: () => {
        let newNews = [
            {
                title: "New Website Launched",
                poster: "5afe8e2ec7fc41d0e8096d00",
                mainImageUrl: "/resources/news/NLwebpage.png",
                category: "Company",
                shortDescription: "We’ve launched our new website. With the help of <a href='https://www.techmeleon.co.uk'>Techmeleon</a> we now have a responsive mobile friendly website. We identified that more than 54% of people visiting webpages now do so using their mobile phone. With the help of <a href='https://www.techmeleon.co.uk'>Techmeleon</a> our website now looks great on both the desktop and mobile phone.",
            },
            {
                title: "Lawnamental is here",
                poster: "5afe8e2ec7fc41d0e8096d00",
                mainImageUrl: "/resources/news/lawnamentalWebsite.png",
                category: "Company",
                shortDescription: "Here at Natural Groundcare we’re also passionate about lawns. So we created a whole new division just so we(you) can show off. Come and check out Lawanamental. The Ornamental Lawn Specialists. ",
            },
            {
                title: "Vans",
                poster: "5afe8e2ec7fc41d0e8096d00",
                mainImageUrl: "/resources/news/van1.jpg",
                category: "Company",
                shortDescription: "Check out the graphics on our vans. Keeping brand continuity is important to us. With the help of Techmeleon we’re looking the best we ever have. Keep a look out for us across south wales.",
            }
        ]

        // Remove settings before running
        News.remove({}, err => {
            if(err){
                logger.error(err)
            } else {
                News.create(newNews, err => {
                    if(err) {
                        logger.error(err)
                    } else {
                        logger.info("News created")
                    }
                });
            };
        });
    }
}

module.exports = output;