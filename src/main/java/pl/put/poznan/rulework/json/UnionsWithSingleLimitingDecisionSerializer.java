package pl.put.poznan.rulework.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.rulelearn.approximations.UnionsWithSingleLimitingDecision;
import org.springframework.boot.jackson.JsonComponent;

import java.io.IOException;

@JsonComponent
public class UnionsWithSingleLimitingDecisionSerializer extends JsonSerializer<UnionsWithSingleLimitingDecision> {

    @Override
    public void serialize(UnionsWithSingleLimitingDecision unionsWithSingleLimitingDecision, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        ObjectMapper mapper = (ObjectMapper) jsonGenerator.getCodec();

        jsonGenerator.writeStartObject();

        jsonGenerator.writeFieldName("downwardUnions");
        jsonGenerator.writeRawValue(mapper.writeValueAsString(unionsWithSingleLimitingDecision.getDownwardUnions()));

        jsonGenerator.writeFieldName("upwardUnions");
        jsonGenerator.writeRawValue(mapper.writeValueAsString(unionsWithSingleLimitingDecision.getUpwardUnions()));

        jsonGenerator.writeFieldName("roughSetCalculator");
        jsonGenerator.writeRawValue(mapper.writeValueAsString(unionsWithSingleLimitingDecision.getRoughSetCalculator()));

        jsonGenerator.writeFieldName("limitingDecisions");
        jsonGenerator.writeRawValue(mapper.writeValueAsString(unionsWithSingleLimitingDecision.getLimitingDecisions()));

        jsonGenerator.writeEndObject();
    }
}
