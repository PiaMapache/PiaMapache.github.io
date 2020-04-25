pl = open("listextra.csv")
print("<table id=\"full-pricelist\">")
for row in pl:
    print("  <tr>")
    cols = row.split(',')
    for cell in cols:
        if cols[1] == "\n":
            print("    <th>" + cell.replace("\n", "") + "</th>")
        else:
            print("    <td>" + cell.replace("\n", "") + "</td>")
    print("  </tr>")
print("</table>")