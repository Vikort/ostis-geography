/**
 * 
 * @param {Array<string>} idtfArray 
 * @returns {Promise<Array<Number>>}
 */
const resolveScAddr = (idtfArray) => {
    return new Promise(resolve => {
        SCWeb.core.Server.resolveScAddr(idtfArray, resolvedScAddrObj => {
            const scAddrArray = idtfArray.map(item => resolvedScAddrObj[item]);
            resolve(scAddrArray);
        });
    });
};

/**
 * 
 * @param {Array<number>} scAddrArray 
 * @returns {Promise<Array<string>>}
 */
const resolveIdtf = (scAddrArray) => {
    return new Promise(resolve => {
        SCWeb.core.Server.resolveIdentifiers(scAddrArray, resolvedIdtf => {
            const idtfArray = scAddrArray.map(item => resolvedIdtf[item]);
            resolve(idtfArray);
        });
    });
};

/**
 * 
 * @param {number} scAddr 
 * @returns {Promise<string>}
 */
const getLinksContent = (scAddr) => {
    return new Promise(resolve => {
        SCWeb.core.Server.getLinkContent(scAddr, content => {
            resolve(content);
        });
    });
};

/**
 * 
 * @param {number} scAddr 
 * @returns {Promise<string>}
 */
const getIdtfName = (scAddr) => {
    return new Promise(resolve => {
        resolveIdtf([scAddr]).then(idtfArray => {
            const name = idtfArray[0] ? { name: idtfArray[0] } : undefined;
            resolve(name);
        });
    });
};

MuseumComponent = {
    ext_lang: 'museum_code',
    formats: ['format_museum'],
    struct_support: true,

    factory: function (sandbox) {
        return new MuseumWindow(sandbox);
    }
};

MuseumWindow = function (sandbox) {
    const $title = '#title';

    const $regionLabel = '#region label';
    const $regionSelect = '#region select'

    const $buttonSearch = '#search';

    const $listContent = '#list-content';
    const $listEmpty = '#list-empty';
    const $listLoading = '#list-loading';

    let labelSite = '';
    let labelPhone = '';
    let labelEmail = '';

    const uiMuseum = ['ui_museum_title', 'ui_museum_select_label', 'ui_museum_list_state_empty', 'ui_museum_list_state_loading', 'ui_museum_button',
                'ui_museum_phone', 'ui_museum_email', 'ui_museum_site'];
    const regions = ['vitebsk_region', 'minsk_region', 'grodno_region', 'brest_region', 'mogilev_region', 'gomel_region'];

    const conceptMuseum = 'concept_museum';
    let museums = [];

    const nrelEmailIdtf = 'nrel_email';
    let nrelEmailScAddr = 0;

    const nrelSiteIdtf = 'nrel_site';
    let nrelSiteScAddr = 0;

    const nrelPhoneIdtf = 'nrel_phone_number';
    let nrelPhoneScAddr = 0;

    const nrelRegionIdtf = 'nrel_region';
    let nrelRegionScAddr = 0;

    /**
     * 
     * @param {number} regionScAddr 
     * @returns {Promise<Array<number>>}
     */
    const getMuseumScAddrArrayByRegionScAddr = (regionScAddr) => {
        return new Promise(async (resolve) => {
            const scAddr = await resolveScAddr([conceptMuseum]);

            window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_3F_A_A, [
                scAddr[0],
                sc_type_arc_pos_const_perm,
                sc_type_node,
            ]).then(result => {
                const scAddr = result ? result.map(item => item[2]) : [];
                return scAddr;
            }).then(allScAddr => {
                const scAddrPromise = allScAddr.map(scAddr => new Promise(resolve => {
                    window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_3F_A_F, [
                        scAddr,
                        sc_type_const,
                        regionScAddr
                    ]).then(() => {
                        resolve(scAddr);
                    }, () => {
                        resolve(undefined);
                    });
                }));

                Promise.all(scAddrPromise).then(scAddrArray => {
                    const filtered = scAddrArray.filter(item => item);
                    resolve(filtered);
                });
            });
        });
    };

    /**
     * 
     * @param {number} scAddr 
     * @returns {Promise<Object>}
     */
    const getRegionOfNodeByScAddr = (scAddr) => {
        return new Promise(resolve => {
            window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_5F_A_A_A_A, [
                scAddr,
                sc_type_const,
                sc_type_node,
                sc_type_arc_pos_const_perm,
                sc_type_node_norole,
            ]).then(iterResult => {
                const regionScAddr = iterResult.filter(item => item[4] === nrelRegionScAddr).map(item => item[2]);

                resolveIdtf(regionScAddr).then(idtfArray => {
                    const region = idtfArray[0] ? { region: idtfArray[0] } : undefined;
                    resolve(region);
                });
            });
        });
    };

    /**
     * 
     * @param {number} scAddr 
     * @returns {Promise<Object>}
     */
    const getLinksContentOfNodeByScAddr = (scAddr) => {
        return new Promise(resolve => {
            window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_5F_A_A_A_A, [
                scAddr,
                sc_type_const,
                sc_type_link,
                sc_type_arc_pos_const_perm,
                sc_type_node_norole,
            ]).then(iterResult => {
                const siteScAddr = iterResult.filter(item => item[4] === nrelSiteScAddr).map(item => item[2]);
                const emailScAddr = iterResult.filter(item => item[4] === nrelEmailScAddr).map(item => item[2]);
                const phoneScAddr = iterResult.filter(item => item[4] === nrelPhoneScAddr).map(item => item[2]);

                const site = siteScAddr[0] ? getLinksContent(siteScAddr[0]) : undefined;
                const email = emailScAddr[0] ? getLinksContent(emailScAddr[0]) : undefined;
                const phone = phoneScAddr[0] ? getLinksContent(phoneScAddr[0]) : undefined;

                Promise.all([site, email, phone]).then(content => {
                    resolve({ site: content[0], email: content[1], phone: content[2] });
                });
            });
        });

    };

    const preLoad = () => {
        return new Promise(resolve => {
            const idtfArray = [nrelRegionIdtf, nrelEmailIdtf, nrelPhoneIdtf, nrelSiteIdtf];

            resolveScAddr(idtfArray).then(scAddrArray => {
                nrelRegionScAddr = scAddrArray[0];
                nrelEmailScAddr = scAddrArray[1];
                nrelPhoneScAddr = scAddrArray[2];
                nrelSiteScAddr = scAddrArray[3];
                resolve();
            });
        });
    };

    /**
     * 
     * @param {number} regionScAddr 
     */
    const loadMuseums = async (regionScAddr) => {
        await preLoad();

        museums = await getMuseumScAddrArrayByRegionScAddr(regionScAddr).then(async (scAddrArray) => {
            const museumArrayPromise = scAddrArray.map((scAddr) => new Promise(async (resolve) => {
                const name = await getIdtfName(scAddr);

                const region = await getRegionOfNodeByScAddr(scAddr);

                const linkedContent = await getLinksContentOfNodeByScAddr(scAddr);

                const museum = { ...name, ...region, ...linkedContent };

                resolve(museum);
            }));

            const museumsArray = await Promise.all(museumArrayPromise);

            return museumsArray;
        });
    };

    const loadHTML = (() => {
        $('#' + sandbox.container).prepend(`
            <div id='museums' class='container'>
                <h1 id='title'></h1>

                <div id='region' class="form-group">
                    <label for="region"></label>
                    <select id="regions" class="form-control"></select>
                </div>

                <button id='search' class='btn btn-primary'></button>
                
                <div class='row'>
                    <div id='list-content'></div>
                    <div id='list-empty' style="display: none;"></div>
                    <div id='list-loading' style="display: none;"></div>
                </div>
            </div>
        `);
    })();

    const init = async () => {
        $($listContent).empty();

        await resolveScAddr(uiMuseum).then(scAddrArray => {
            resolveIdtf(scAddrArray).then(idtfArray => {
                $($title).html(idtfArray[0]);
                $($regionLabel).html(idtfArray[1]);
                $($listEmpty).html(idtfArray[2]);
                $($listLoading).html(idtfArray[3]);
                $($buttonSearch).html(idtfArray[4]);

                labelPhone = idtfArray[5];
                labelEmail = idtfArray[6];
                labelSite = idtfArray[7];
            });
        });

        await resolveScAddr(regions).then(scAddrArray => {
            resolveIdtf(scAddrArray).then(idtfArray => {
                idtfArray.forEach((item, index) => {
                    $($regionSelect).append(`
                        <option value='${scAddrArray[index]}'>
                            ${item}
                        </option>
                    `);
                });
            });
        });

        $($buttonSearch).unbind( "click" );
        $($buttonSearch).bind("click", async (event) => {
            event.preventDefault();

            $($listContent).empty();
            $($listLoading).show();

            const regionScAddr = $($regionSelect).val();

            museums = [];

            await loadMuseums(regionScAddr);

            $($listLoading).hide();

            museums.forEach(museum => {
                $($listContent).prepend(`
                    <div class='border border-primary rounded bg-info' style='margin: 10px;'>
                        <div class='container' style='padding-bottom: 5px;'>
                            <h3>${museum.name}</h3>
                            ${museum.region ? `<h4>${museum.region}</h4>` : ''}
                            ${museum.site ? `<div>${labelSite} <a href='${museum.site}'>${museum.site}</a></div>` : ''}
                            ${museum.email ? `<div>${labelEmail} <a href="mailto:${museum.email}">${museum.email}</a></div>` : ''}
                            ${museum.phone ? `<div>${labelPhone} <a href="tel:${museum.phone}">${museum.phone}</a></div>` : ''}
                        </div>
                    </div>
                `);
            });
        });
    };
    init();

    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    this.applyTranslation = () => {
        init();
    };

    this.sandbox.eventApplyTranslation = $.proxy(this.applyTranslation, this);
};

SCWeb.core.ComponentManager.appendComponentInitialize(MuseumComponent);