<?php
	include('./_data.php');
	$array = explode(" ", $string);

	$columns = 50;
	$arrays = array_chunk($array, $columns);
?>
<!DOCTYPE html>
<html>
	<head>
		<link rel='stylesheet' href='./normalize.css'>
		<link rel='stylesheet' href='./FrozenTable.css'>
		<style>
			th,
			td {
				border: 1px solid gray;
				padding: 7px;
				min-width: 45px;
			}

			<?php
				/*.content {
					display: inline-block;
					width: 700px;
					margin: 40px;
				}

				.wrapper {
					width: 100%;
					height: 400px;
					overflow: auto;
				} */
			?>

			html,
			body {
				height: 100%;
			}

			.content {
				width: 100%;
				height: 100%;
				overflow: auto;
			}
		</style>
	</head>
	<body>
		<div class="content">
			<table>
				<thead>
					<tr>
						<?php foreach($arrays[0] as $col => $cell): ?>
						<th class="col-<?php echo $col; ?>"><?php echo $cell; ?></th>
						<?php endforeach; ?>
					</tr>
				</thead>
				<tbody>
					<?php foreach($arrays as $row): ?>
					<tr>
						<?php foreach($row as $col => $cell): ?>
						<td class="col-<?php echo $col; ?>"><?php echo $cell; ?></td>
						<?php endforeach; ?>
					</tr>
					<?php endforeach; ?>
				</tbody>
			</table>
		</div>
		<?php
			/*<div class="content">
			<p>Rows and Columns not set. Default: 1,1</p>
			<div class="wrapper">
				<table>
					<thead>
						<tr>
							<?php foreach($arrays[0] as $col => $cell): ?>
							<th class="col-<?php echo $col; ?>"><?php echo $cell; ?></th>
							<?php endforeach; ?>
						</tr>
					</thead>
					<tbody>
						<?php foreach($arrays as $row): ?>
						<tr>
							<?php foreach($row as $col => $cell): ?>
							<td class="col-<?php echo $col; ?>"><?php echo $cell; ?></td>
							<?php endforeach; ?>
						</tr>
						<?php endforeach; ?>
					</tbody>
				</table>
			</div>
		</div>

		<div class="content">
			<p>Rows and Columns set with "data-frozen-rows" and "data-frozen-columns"</p>
			<div class="wrapper">
				<table data-frozen-rows="2" data-frozen-columns="2">
					<thead>
						<tr>
							<?php foreach($arrays[0] as $col => $cell): ?>
							<th class="col-<?php echo $col; ?>"><?php echo $cell; ?></th>
							<?php endforeach; ?>
						</tr>
					</thead>
					<tbody>
						<?php foreach($arrays as $row): ?>
						<tr>
							<?php foreach($row as $col => $cell): ?>
							<td class="col-<?php echo $col; ?>"><?php echo $cell; ?></td>
							<?php endforeach; ?>
						</tr>
						<?php endforeach; ?>
					</tbody>
				</table>
			</div>
		</div> */ ?>
	</body>
	<script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
	<script src="./FrozenTable.js"></script>
	<script src="./main.js"></script>
</html>