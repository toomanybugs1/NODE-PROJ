var colorsBg = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)' ];

var colorsBd = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)' ];


function loadCharts(proteins) {

 //   var proteins = <%- JSON.stringify(proteins) %>
        
    var scrollList = document.getElementById('snapControl');

        for (var i = 0; i < proteins.length; i++){

            var contentDiv = document.getElementById("chartList");

            var mainDiv = document.createElement("div");
            var leftDiv = document.createElement("div");
            var centerDiv = document.createElement("div");
            var rightDiv = document.createElement("div");

            mainDiv.setAttribute('class', 'mainDiv');

            leftDiv.setAttribute('class', 'leftDiv');

            centerDiv.setAttribute('class', 'centerDiv');

            rightDiv.setAttribute('class', 'rightDiv');

            mainDiv.appendChild(leftDiv);
            mainDiv.appendChild(centerDiv);
            mainDiv.appendChild(rightDiv);

            contentDiv.appendChild(mainDiv);

            var canvas = document.createElement("canvas");

            var pDomNum = document.createElement("p");
            var pDomNumText = document.createTextNode("Domains: " + proteins[i].head.domainNum);
            pDomNum.appendChild(pDomNumText);
            leftDiv.appendChild(pDomNum);
            
            proteins[i].head.domains.forEach(function(e){
                
                var pDom = document.createElement("p");
                var pDomText = document.createTextNode('(' + e + ')');
                pDom.appendChild(pDomText);
                leftDiv.appendChild(pDom);
                
            });
            
            var scrollLink = document.createElement("a");
            scrollLink.href = "#myChart" + i;
            scrollLink.innerHTML = proteins[i].head.name;
            scrollList.appendChild(scrollLink);

            canvas.id = "myChart" + i;
            canvas.width = 800;
            canvas.height = 400;
            centerDiv.appendChild(canvas);
            var entryIndexes = [proteins[i].head.entryNum];

            proteins[i].entries.forEach(function(e, index){
                
                entryIndexes[index] = index + 1;
                
            });

            var domainIndexes = [];
            
            proteins[i].head.domains.forEach(function(e){
                
                var nums = e.split('-');
                domainIndexes.push(nums[0]);
                domainIndexes.push(nums[1]);
                
            });
            
            var annotations = [{ //this is our horizontal line
                drawTime: "afterDatasetsDraw",
                id: "hLine",
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: '0.42',
                borderColor: 'black',
                borderWidth: 1,
            }];
            
            domainIndexes.forEach(function(e, index){
               
                annotations.push({
                    drawTime: "afterDatasetsDraw",
                    id: "dLine" + index,
                    type: 'line',
                    mode: 'vertical',
                    scaleID: 'x-axis-0',
                    value: parseInt(e),
                    borderColor: colorsBd[ i % colorsBd.length ],
                    borderWidth: 1,
                });
                
            });


            var ctx = document.getElementById("myChart" + i);
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: entryIndexes,
                    datasets: [{
                        label: proteins[i].head.name,
                        data: proteins[i].entries,
                        backgroundColor: colorsBg[ i % colorsBg.length ],
                        borderColor: colorsBd[ i % colorsBd.length ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    },
                    annotation: {
                        annotations: annotations,
                    },
                }
            });
        }
}