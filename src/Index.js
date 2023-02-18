import React from 'react';

const Index = ()=>{
    const html=`	<div>
    <a class="home">
        <div style="color: #4c75f2;">COVID</div>
        <div style="color: #6c757d;">19</div>
    </a>

    <div class="search-heading">Search your district or state</div>
</div>

<div class="search-container">
    <nav class="navbar">
        <form class="form-inline">
            <input
                class="form-control"
                placeholder="Search"
                aria-label="Search"
            />
        </form>
    </nav>
</div>

<div class="wrapper">
    <div class="box">
        <div class="heading confirmed">Confirmed</div>
        <div class="deltaConfirmed"></div>
        <div class="isConfirmed"></div>
        <div class="confirmGraph" data-color="rgba(233, 8, 56, 1)">
            <canvas class="myChart1"></canvas>
        </div>
    </div>

    <div class="box">
        <div class="heading active">Active</div>
        <div class="deltaActive"></div>
        <div class="isActive"></div>
        <div class="activeGraph" data-color="rgba(1, 120, 247, 1)">
            <canvas class="myChart2"></canvas>
        </div>
    </div>

    <div class="box">
        <div class="heading recovered">Recovered</div>
        <div class="deltaRecovered"></div>
        <div class="isRecovered"></div>
        <div class="recoveredGraph" data-color="rgba(39, 155, 66, 1)">
            <canvas class="myChart3"></canvas>
        </div>
    </div>

    <div class="box">
        <div class="heading deceased">Deceased</div>
        <div class="deltaDeceased"></div>
        <div class="isDeceased"></div>
        <div class="deceasedGraph" data-color="rgba(101, 110, 118, 1)">
            <canvas class="myChart4"></canvas>
        </div>
    </div>
</div>

<div class="container-statewise">
    <div class="wrapper-statewise">
        <div class="statename">State/UT</div>
        <div class="confirmeddata">Confirmed</div>
        <div class="activedata">Active</div>
        <div class="recovereddata">Recovered</div>
        <div class="deceaseddata">Deceased</div>
    </div>
</div>

<footer class="footer">
    <div class="foothead"></div>
    <div class="icons">
        <a title="github" href="https://github.com/ankur221b"
            ><i style="color: #656e76;" class="fab fa-github"></i
        ></a>
        <a title="api" href="https://api.covid19india.org"
            ><i
                style="color: rgba(255, 193, 7, 0.6);"
                class="fas fa-database"
            ></i
        ></a>
        <a title="twitter" href="https://twitter.com"
            ><i style="color: #4c75f2;" class="fab fa-twitter"></i
        ></a>
        <a title="mail" href="mailto:ankur221b@gmail.com"
            ><i style="color: #b6854d;" class="fas fa-envelope"></i
        ></a>
    </div>
</footer>	<div>
			<a class="home">
				<div style="color: #4c75f2;">COVID</div>
				<div style="color: #6c757d;">19</div>
			</a>

			<div class="search-heading">Search your district or state</div>
		</div>

		<div class="search-container">
			<nav class="navbar">
				<form class="form-inline">
					<input
						class="form-control"
						placeholder="Search"
						aria-label="Search"
					/>
				</form>
			</nav>
		</div>

		<div class="wrapper">
			<div class="box">
				<div class="heading confirmed">Confirmed</div>
				<div class="deltaConfirmed"></div>
				<div class="isConfirmed"></div>
				<div class="confirmGraph" data-color="rgba(233, 8, 56, 1)">
					<canvas class="myChart1"></canvas>
				</div>
			</div>

			<div class="box">
				<div class="heading active">Active</div>
				<div class="deltaActive"></div>
				<div class="isActive"></div>
				<div class="activeGraph" data-color="rgba(1, 120, 247, 1)">
					<canvas class="myChart2"></canvas>
				</div>
			</div>

			<div class="box">
				<div class="heading recovered">Recovered</div>
				<div class="deltaRecovered"></div>
				<div class="isRecovered"></div>
				<div class="recoveredGraph" data-color="rgba(39, 155, 66, 1)">
					<canvas class="myChart3"></canvas>
				</div>
			</div>

			<div class="box">
				<div class="heading deceased">Deceased</div>
				<div class="deltaDeceased"></div>
				<div class="isDeceased"></div>
				<div class="deceasedGraph" data-color="rgba(101, 110, 118, 1)">
					<canvas class="myChart4"></canvas>
				</div>
			</div>
		</div>

		<div class="container-statewise">
			<div class="wrapper-statewise">
				<div class="statename">State/UT</div>
				<div class="confirmeddata">Confirmed</div>
				<div class="activedata">Active</div>
				<div class="recovereddata">Recovered</div>
				<div class="deceaseddata">Deceased</div>
			</div>
		</div>

		<footer class="footer">
			<div class="foothead"></div>
			<div class="icons">
				<a title="github" href="https://github.com/ankur221b"
					><i style="color: #656e76;" class="fab fa-github"></i
				></a>
				<a title="api" href="https://api.covid19india.org"
					><i
						style="color: rgba(255, 193, 7, 0.6);"
						class="fas fa-database"
					></i
				></a>
				<a title="twitter" href="https://twitter.com"
					><i style="color: #4c75f2;" class="fab fa-twitter"></i
				></a>
				<a title="mail" href="mailto:ankur221b@gmail.com"
					><i style="color: #b6854d;" class="fas fa-envelope"></i
				></a>
			</div>
		</footer>
		<script
			type="module"
			crossorigin="anonymous"
			src="./script.js"
		></script>`;
    return(<>
     <div>
    { <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} /> }
  </div>
    </>)
}

export default Index;