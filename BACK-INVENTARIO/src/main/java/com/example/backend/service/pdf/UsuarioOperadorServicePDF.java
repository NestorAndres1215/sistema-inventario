package com.example.backend.service.pdf;

import java.io.ByteArrayOutputStream;
import java.util.List;
import com.example.backend.entity.Usuario;
import com.example.backend.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

@Service
@RequiredArgsConstructor
public class UsuarioOperadorServicePDF {

	private final UsuarioService usuarioRepository;

    public byte[] generarInformePdf() throws DocumentException {
		List<Usuario> productosActivos = usuarioRepository.listarUsuarioNormalActivado();;

		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		Document document = new Document();
		PdfWriter.getInstance(document, byteArrayOutputStream);

		document.open();

		Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD, BaseColor.BLACK);
		Paragraph title = new Paragraph("Informe de Usuario Administrador", titleFont);
		title.setAlignment(Element.ALIGN_CENTER);
		document.add(title);

		Paragraph emptySpace = new Paragraph(" ");
		document.add(emptySpace);

		PdfPTable table = new PdfPTable(6);
		table.setWidthPercentage(100);

		float[] columnWidths = { 10f, 15f, 10f,10f,10f,10f };

		table.setWidths(columnWidths);

		Font headerFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD, BaseColor.WHITE);
		PdfPCell headerCell;

		headerCell = new PdfPCell(new Phrase("ID", headerFont));
		headerCell.setBackgroundColor(BaseColor.DARK_GRAY);
		headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table.addCell(headerCell);

		headerCell = new PdfPCell(new Phrase("Nombre", headerFont));
		headerCell.setBackgroundColor(BaseColor.DARK_GRAY);
		headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table.addCell(headerCell);

		headerCell = new PdfPCell(new Phrase("Apellido", headerFont));
		headerCell.setBackgroundColor(BaseColor.DARK_GRAY);
		headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table.addCell(headerCell);
		
		headerCell = new PdfPCell(new Phrase("Direccion", headerFont));
		headerCell.setBackgroundColor(BaseColor.DARK_GRAY);
		headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table.addCell(headerCell);
		
		headerCell = new PdfPCell(new Phrase("Telefono", headerFont));
		headerCell.setBackgroundColor(BaseColor.DARK_GRAY);
		headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table.addCell(headerCell);
		
		headerCell = new PdfPCell(new Phrase("Dni", headerFont));
		headerCell.setBackgroundColor(BaseColor.DARK_GRAY);
		headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table.addCell(headerCell);

		Font cellFont = new Font(Font.FontFamily.HELVETICA, 10, Font.NORMAL, BaseColor.BLACK);
		PdfPCell cell;

		for (Usuario producto : productosActivos) {
		    PdfPCell cell1;

		    cell1 = new PdfPCell(new Phrase(String.valueOf(producto.getId()), cellFont));
		    cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
		    table.addCell(cell1);

		    cell1 = new PdfPCell(new Phrase(producto.getNombre(), cellFont));
		    cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
		    table.addCell(cell1);

		    cell1 = new PdfPCell(new Phrase(producto.getApellido(), cellFont));
		    cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
		    table.addCell(cell1);

		    cell1 = new PdfPCell(new Phrase(producto.getDireccion(), cellFont));
		    cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
		    table.addCell(cell1);

		    cell1 = new PdfPCell(new Phrase(producto.getTelefono(), cellFont));
		    cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
		    table.addCell(cell1);

		    cell1 = new PdfPCell(new Phrase(String.valueOf(producto.getDni()), cellFont));
		    cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
		    table.addCell(cell1);
		}

		document.add(table);

		document.close();

		return byteArrayOutputStream.toByteArray();
	}
}
